
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




router.get('/patient', (req, res) => {
    res.render('patientRegistration', { message: "" });
})

router.get('/pharmacist', (req, res) => {
    res.render('pharmacistRegistration', { message: "" });

})


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

module.exports = router;