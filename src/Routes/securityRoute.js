
const multer =require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const patientModel = require('../Models/Patient.js');
const userModel = require('../Models/user.js');
const reqPharmacist = require('../Models/requestedPharmacist.js');
const validator = require('email-validator');
const protect = require('../middleware/authMiddleware.js');


router.post('/patient', async (req, res) => {
    if (!req.body.username || !req.body.dateOfBirth || !req.body.password
        || !req.body.name || !req.body.email || !req.body.mobile
        || !req.body.first || !req.body.last || !req.body.emergencyNumber
        || !req.body.emergencyRel || !req.body.gender) {

        return res.status(400).json({ message: 'You have to complete all the fields', success: false })

    }
    if (req.body.username.includes(' ')) {
        return res.status(400).json({ message: 'username has to be one word', success: false })
    }
    const savedUser = await userModel.find({ Username: req.body.username });
    if (savedUser.length > 0)
        return res.status(400).json({ message: 'username has to be unique', success: false })

    const unqiueUser = await userModel.find({ Email: req.body.email });
    if (unqiueUser.length > 0)
        return res.status(400).json({ message: 'email has to be unique', success: false })
    //return(res.status(400).send({message: "username exists "}));

    // if (!validator.validate(req.body.email))
    //     return (res.render('patientRegistration', { message: "Please enter a valid email" }));

    //   return(res.status(400).json({message:"Please enter a valid email"}))
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newPatient = new patientModel({
            Username: req.body.username.toLowerCase(),
            Password: hashedPassword,
            Name: req.body.name.toLowerCase(),
            Email: req.body.email,
            DateOfBirth: req.body.dateOfBirth,
            MobileNumber: req.body.mobile,
            EmergencyContactFullName: req.body.first + " " + req.body.last,
            EmergencyContactMobileNumber: req.body.emergencyNumber,
            EmergencyContactRelationToThePatient: req.body.emergencyRel,
            Gender: req.body.gender
        });

        newPatient.save();

        let token = generateToken(newPatient._id)

        return res.status(200).json({ message: "You have registered", success: true, token })
    }
    catch (error) {
        return res.status(400).json({ message: error.message, success: false })

    }
})


router.post('/pharmacist', upload.fields([{ name: "ID" }, { name: "Degree" }, { name: "License" }]), async (req, res) => {
    if (!req.body.username || !req.body.dateOfBirth || !req.body.password
        || !req.body.name || !req.body.email || !req.body.hourlyRate
        || !req.body.affiliation || !req.body.education || !req.files?.ID[0] || !req.files?.Degree[0]
        || !req.files?.License[0]) {
        return res.status(400).json({ message: 'You have to complete all the fields', success: false })
    }
    if (req.body.username.includes(' ')) {
        return res.status(400).json({ message: 'username has to be one word', success: false })
    }
    const savedUser = await userModel.find({ Username: req.body.username });
    if (savedUser.length > 0)
        return res.status(400).json({ message: 'username has to be unique', success: false })

    const unqiueUser = await userModel.find({ Email: req.body.email });
    if (unqiueUser.length > 0)
        return res.status(400).json({ message: 'email has to be unique', success: false })
    //return(res.status(400).send({message: "username exists "}));
    // if (!validator.validate(req.body.email))
    //     return (res.render('../../views/doctorRegistration', { message: "Please enter a valid email" }));
    // if(!validator.validate(req.body.email))
    //      return(res.status(400).json({message:"Please enter a valid email"}))
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newPharmacist = new reqPharmacist({
            Username: req.body.username,
            Password: hashedPassword,
            Name: req.body.name,
            Email: req.body.email,
            DateOfBirth: req.body.dateOfBirth,
            HourlyRate: req.body.hourlyRate,
            Affiliation: req.body.affiliation,
            EducationalBackground: req.body.education,
            ID: {
                data: req.files?.ID[0].buffer,
                contentType: req.files?.ID[0].mimetype,
            },
            Degree: {
                data: req.files?.Degree[0].buffer,
                contentType: req.files?.Degree[0].mimetype,
            },
            License: {
                data: req.files?.License[0].buffer,
                contentType: req.files?.License[0].mimetype,
            },
        });


        newPharmacist.save();


        return res.status(200).json({ message: "You have registered", success: true, newPharmacist })
    }
    catch (error) {
        return res.status(400).json({ message: error.message, success: false })
    }
});


router.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body

    console.log(username);
    console.log(password);
    if (!username || !password) {
        res.status(400).json({ message: 'Please fill all fields', success: false })
        return;
    }

    const user = await userModel.findOne({ Username: username })

    console.log(user);
    console.log(username);
    console.log(password);
    if (user && (await bcrypt.compare(password, user.Password))) {
        // generate token
        if(user.__t === 'ReqPharmacist'){
            return res.status(400).json({ message: 'Please wait for admin approval', success: false })
        }

        res.status(200).json({
            Result:
            {
                _id: user._id,
                name: user.Name,
                email: user.Email,
                type: user.__t,
                token: generateToken(user._id)
            },
            success: true
        })
    }
    else {
        res.status(400).json({ message: 'Invalid username or password', success: false })
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

router.post('/changePassword',protect, async(req,res)=>{
    //const oldPass=req.user.Password;
    const oldPassEntered=req.body.oldPassword;
    const newPass=req.body.password;
    try{
    const user=await userModel.findOne({_id:req.user._id});
    const oldPass=user.Password;    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt)
    console.log(oldPassEntered)
   
        const isMatch = await bcrypt.compare(oldPassEntered, oldPass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password', success: false })
        }
        const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id },
            {
                Password: hashedPassword,
            });
        res.status(200).json({ Result: updatedUser, success: true })
    }
    catch (err) {
        res.status(400).json({ message: err.message, success: false })
    }
});

router.post('/sendOTP', async (req, res) => {
    const email = req.body.email
    const user = await userModel.findOne({ Email: email })
    console.log(user)
    if (user) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const newOtp = new otpModel({
            userId: user._id,
            otp: otp
        });
        newOtp.save();
        console.log("OTP: ", otp);

        try {
            const mailResponse = await mailSender(
                email,
                "Verification Email",
                `<h1>Please confirm your OTP</h1>
                 <p>Here is your OTP code: ${otp}</p>`
            );
            if (mailResponse) {
                console.log("Email sent successfully: ", mailResponse);
                res.status(200).json({ message: 'Email sent', success: true })
            }
            else {
                res.status(400).json({ message: 'Error sending email', success: false });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error sending email', success: false })
        }
    }
    else {
        res.status(400).json({ message: 'Email not found', success: false })

    }

})
router.post('/verifyOTP', async (req, res) => {
    try {
        const email = req.body.email
        const user = await userModel.findOne({ Email: email })
        console.log(user)
        const response = await otpModel.find({ userId: user._id }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || req.body.otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }
        else {
            console.log("OTP is valid");
            const updateOtp = await otpModel.findOneAndUpdate({ _id: response[0]._id },
                {
                    isVerified: true,
                });
            res.status(200).json({ Result: updateOtp, success: true });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error verifying OTP', success: false })
    }

})
router.post('/forgotPassword',async (req, res) => {
    const  email  = req.body.email
    let user = await userModel.findOne({ Email: email })
    console.log('here')
    try{
    const newPass=req.body.password;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(hashedPassword)
    const updatedUser = await userModel.findOneAndUpdate({ _id: user._id },
        {
            Password: hashedPassword,
        });
        console.log(updatedUser)
        
        res.status(200).json({ Result: updatedUser, success: true })
    } catch (error) {
        res.status(400).json({ message: 'Error changing password', success: false })
    }


});
const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: 'Terminal Titans',
            to: email,
            subject: title,
            html: body,
        });
        console.log("Email info: ", info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = router;