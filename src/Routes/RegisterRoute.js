const express = require("express");
const router = express.Router();
patientModel=require( '../Models/Patient.js');
 userModel =require( '../Models/user.js');
 reqPharmacist =require( '../Models/requestedPharmacist.js');
 validator =require('email-validator');


router.get('/patient',(req,res)=>{
    res.render('patientRegistration',{ message: "" });
})

router.get('/pharmacist',(req,res)=>{
    res.render('pharmacistRegistration',{ message: "" });

})


router.post('/patient',async (req,res)=>{

   if(!req.body.username || !req.body.dob || !req.body.password 
   || !req.body.name || !req.body.email || !req.body.mobile
   || !req.body.first || !req.body.last || !req.body.emergencyNumber 
   || !req.body.emergencyRel || !req.body.gender  ){
    // let msg="You must complete these fields: "
        // if(!req.body.username) msg+="username, "
        // if( !req.body.password) msg+="password, "
        // if( !req.body.name) msg+="name, "
        // if( !req.body.email) msg+="email, "
        // if( !req.body.dob) msg+="Date of birth, "
        // if( !req.body.mobile) msg+="Mobile Number, "
        // if( !req.body.first || !req.aborted.last) msg+="Emergency Contact's name, "
        // if( !req.body.emergencyNumber) msg+="Emergency contact's Number, "
        // if( !req.body.emergencyRel) msg+="Emergency contact's relation, "
        // if( !req.body.gender) msg+="gender, "

     return(res.render('patientRegistration',{message: "please fill all fields"}));

   }
   if(req.body.username.includes(' ')){
    
    //return(res.status(400).send({message: "username has to be one word "}));

    return(res.render('patientRegistration',{message: "username has to be one word"}));

}
   const savedUser =  await userModel.find({Username :req.body.username});
    if(savedUser.length>0)
    return(res.render('patientRegistration',{message: "username has to be unique "}));
    const unqiueUser =  await userModel.find({Email :req.body.email});
    if(unqiueUser.length>0)
    return(res.render('patientRegistration',{message: "email has to be unique"}));
    //return(res.status(400).send({message: "username exists "}));

   if(!validator.validate(req.body.email))
   return(res.render('patientRegistration',{message:"Please enter a valid email"}));

     //   return(res.status(400).json({message:"Please enter a valid email"}))
   try{
    const newPatient = new patientModel({
        Username : req.body.username.toLowerCase(),
        Password : req.body.password,
        Name:req.body.name.toLowerCase(),
        Email:req.body.email,
         DateOfBirth:req.body.dob,
         MobileNumber :req.body.mobile,
         EmergencyContactFullName:req.body.first+" "+req.body.last,
         EmergencyContactMobileNumber:req.body.emergencyNumber,
         EmergencyContactRelationToThePatient:req.body.emergencyRel,
         Gender:req.body.gender
    });
    
    newPatient.save();
    // res.status(200).json({success:true});
   return res.redirect('/'); //render patient views page
    }
    catch(error){
        res.status(400).send({error: error});

    }
})


router.post('/pharmacist',async (req,res)=>{

    if(!req.body.username || !req.body.dob || !req.body.password 
    || !req.body.name || !req.body.email || !req.body.hourlyRate
    || !req.body.affiliation || !req.body.education  ){
        // let msg="You must complete these fields: "
        // if(!req.body.username) msg+="username, "
        // if( !req.body.password) msg+="password, "
        // if( !req.body.name) msg+="name, "
        // if( !req.body.email) msg+="email, "
        // if( !req.body.dob) msg+="Date of birth, "
        // if( !req.body.hourlyRate) msg+="Hourly Rate, "
        // if( !req.body.affiliation) msg+="Affiliation, "
        // if( !req.body.education) msg+="Education, "
        // if( !req.body.speciality) msg+="Speciality, "

     //return(res.status(400).send({message: msg.slice(0,-2)}));
     return(res.render('pharmacistRegistration',{message: "please fill all fields"}));

    }
    if(req.body.username.includes(' ')){
        return(res.render('pharmacistRegistration',{message: "username has to be one word"}));

        //return(res.status(400).send({message: "username has to be"}));

    }
    const savedUser =  await userModel.find({Username :req.body.username});
     if(savedUser.length>0)
     return(res.render('pharmacistRegistration',{message: "username exists "}));
     const unqiueUser =  await userModel.find({Email :req.body.email});
    if(unqiueUser.length>0)
    return(res.render('pharmacistRegistration',{message: "email has to be unique"}));
     //return(res.status(400).send({message: "username exists "}));
     if(!validator.validate(req.body.email))
     return(res.render('pharmacistRegistration',{message:"Please enter a valid email"}));
    // if(!validator.validate(req.body.email))
    //      return(res.status(400).json({message:"Please enter a valid email"}))   
    try{
     const NewPharmacist = new reqPharmacist({
        Username : req.body.username.toLowerCase(),
         Password : req.body.password,
          Name:req.body.name.toLowerCase(),
          Email:req.body.email,
          DateOfBirth:req.body.dob,
          HourlyRate:req.body.hourlyRate,
          Affiliation:req.body.affiliation,
          EducationalBackground:req.body.education,
     });
     
     NewPharmacist.save();
     //res.status(200).send("success");
     return res.redirect('/');
     }
     catch(error){
         res.status(400).send({error: error});
 
     }
 });

module.exports = router;
