const PatientModel = require("../Models/Patient.js");
const MedicineModel = require("../Models/Medicine.js");
const express = require('express');
const router = express.Router();

//App variables
const app = express();
app.use(express.urlencoded({extended: false}))

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
       res.status(500).json({error: 'Failed OP', success : false })
    }
 }
  //filter 
  const filterMed = async (req, res) => {
   const MedicalUse = req.params.MedicalUse.toLowerCase();
   if (!MedicalUse) {
     return res.status(400).send({ message: 'Please fill the input', success : false  });
   }
   
   const Medicines = await MedicineModel.find({ MedicalUse });
   if (!Medicines.length) {
     return res.status(400).send({ message: 'No medicines found with the specified medical use.', success : false  });
   }
   
   res.status(200).send({Result : Medicines, success : true })
     
    }
  router.get('/filterMedical/:MedicalUse', filterMed);



//search for medicine based on name
const getMedicine = async (req, res) => {
   const Name = req.params.Name.toLowerCase();
   if (!Name) {
     return res.status(400).send({ message: 'Please fill the input' , success : false });
   }
   try{
     // const Name = req.body;
      const Medicines= await MedicineModel.findOne({Name});
      if (!Medicines){
        return(res.status(400).send({message: "No Medicine with this name", success : false }));
      }
      res.status(200).json({Result : Medicines, success : true });
      }
   
   catch(error){
      res.status(500).json({message:"Failed getMedicine", success : false })
   }
  }

  router.get('/getMedicine/:Name', getMedicine);

  //view a list of all available medicine pic,price,description
  // const viewInfo =async (req,res)=> {
  //  const pic = req.query.Picture;
  //  const price = req.query.Price;



  // }
  // router.get('/viewAvailableMedicines', viewInfo);

   module.exports = router;
