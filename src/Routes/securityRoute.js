const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
patientModel = require('../Models/Patient.js');
userModel = require('../Models/user.js');
reqPharmacist = require('../Models/requestedPharmacist.js');
validator = require('email-validator');


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

        return res.status(200).json({ message: "You have registered", success: true, Result: newPatient })
    }
    catch (error) {
        return res.status(400).json({ message: error.message, success: false })

    }
})


router.post('/pharmacist', async (req, res) => {

    if (!req.body.username || !req.body.dateOfBirth || !req.body.password
        || !req.body.name || !req.body.email || !req.body.hourlyRate
        || !req.body.affiliation || !req.body.education) {
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
    //     return (res.render('pharmacistRegistration', { message: "Please enter a valid email" }));
    // if(!validator.validate(req.body.email))
    //      return(res.status(400).json({message:"Please enter a valid email"}))   
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const NewPharmacist = new reqPharmacist({
            Username: req.body.username.toLowerCase(),
            Password: hashedPassword,
            Name: req.body.name.toLowerCase(),
            Email: req.body.email,
            DateOfBirth: req.body.dateOfBirth,
            HourlyRate: req.body.hourlyRate,
            Affiliation: req.body.affiliation,
            EducationalBackground: req.body.education,
        });

        NewPharmacist.save();

        return res.status(200).json({ message: "You have registered", success: true, Result: NewPharmacist })
    }
    catch (error) {
        return res.status(400).json({ message: error.message, success: false })
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body

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
