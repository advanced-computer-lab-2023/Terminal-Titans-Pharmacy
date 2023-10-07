const PatientModel = require("../Models/Patient");

//add another patient with a set username and password
const createPatient = async(req,res) => {
    try{
       const {Username, Gender,Name,Email,Password,HourlyRate,Affiliation,EducationalBackground,Position} = req.body;
       const userexist = await PatientModel.findOne({Username});
       if(userexist){
         res.status(400);
         throw new Error("Username already exist");
       }
       const Patient = new PatientModel({Username, Gender,Name,Email,Password,HourlyRate,Affiliation,EducationalBackground,Position});
       const NewPatient = await Patient.save();
       res.status(201).json(NewPatient);  
     }
    catch (error){
       res.status(500).json({error: 'Failed OP'})
    }
 }
 module.exports={createPatient};