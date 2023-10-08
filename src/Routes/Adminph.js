const adminModel = require('../Models/Admin.js');
const phModel = require('../Models/Pharmacist.js');
const patientModel = require('../Models/Patient.js');
const MedicineModel = require('../Models/Medicine.js');
const ReqPharmModel = require('../Models/requestedPharmacist.js');
const express = require('express');
const router = express.Router();


//App variables
const app = express();
app.use(express.urlencoded({extended: false}))

const createAdmin = async (req, res) => {
   const Username = req.body.Username.toLowerCase();
   const Pass = req.body.Pass.toLowerCase();
  const Position = 'Admin';
  if(!req.body.Username){
    return(res.status(400).send({message: "user not filled "}));

   }
   if(!req.body.Pass){
      return(res.status(400).send({message: "pass not filled "}));
   }

  try {
    const userexist = await adminModel.findOne({ Username });
    if (userexist) {
      throw new Error('Username already exist');
    }

    const admin = new adminModel({ Username, Pass, Position });
    const Nadmin = await admin.save();
    res.status(201).json(Nadmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.post('/createAdmin', createAdmin);

const deleteAdmin = async (req, res) => {
   const Username = req.query.Username.toLowerCase();
   if (!Username) {
     return res.status(400).send({ message: 'user not filled' });
   }
 
   try {
     const dph = await phModel.findOneAndRemove({ Username });
     const dPatient = await patientModel.findOneAndRemove({ Username });
 
     if (!dph && !dPatient) {
       res.status(404).json({ message: 'user not found' });
     } else {
      res.status(200).json({ message: 'Admin has deleted successfully.' });
     }
   } catch (error) {
     res.status(500).json({ message: 'Failed to delete user' });
   }
 };
 router.get('/deleteAdmin', async (req, res) => {
   // Handle GET requests.
   const Username = req.query.Username.toLowerCase();

   // If the username is not present, return a 400 Bad Request response.
   if (!Username) {
     return res.status(400).json({ message: 'Username is required.' });
   }
 
   // Try to find the admin in the database.
   const dph = await phModel.findOneAndRemove({ Username });
   const dPatient = await patientModel.findOneAndRemove({ Username });

   if (!dph && !dPatient) {
     res.status(404).json({ message: 'user not found' });
   } else {
    res.status(200).json({ message: 'Admin has deleted successfully.' });
   }
 });
 
 router.delete('/deleteAdmin', deleteAdmin);


//search for medicine based on name
const getMedicine = async (req, res) => {
   const Name = req.query.Name.toLowerCase();
   if (!Name) {
     return res.status(400).send({ message: 'Please fill the input' });
   }
   try{
     // const Name = req.body;
      const Medicines= await MedicineModel.findOne({Name});
      if (!Medicines){
        return(res.status(400).send({message: "No Medicine with this name"}));
      }
      res.status(200).json(Medicines);
      }
   
   catch(error){
      res.status(500).json({message:"Failed getMedicine"})
   }
  }

  router.get('/getMedicine', getMedicine);


//view a list of all available medicines (including picture of medicine, price, description)
const getListMed = async (req, res) => {
  //retrieve all users from the database
  try{
     const meds= await MedicineModel.find();
     res.status(200).json(meds);
     }
  
  catch(error){
     res.status(500).json({message:"No Medicine listed"})
  }
 }

 router.get('/getAllMedicine', getListMed);
//view a pharmacist's information
 const getPharmacist = async (req, res) => {
   const Name = req.query.Name.toLowerCase();
   if (!Name) {
     return res.status(400).send({ message: 'user not filled ' });
   }
  try{
     const Pharma= await phModel.find({Name});
     if (!Pharma){
      return(res.status(400).send({message: "Pharmacist Not Found"}));
     }
     res.status(200).json(Pharma);
     }
  
  catch(error){
     res.status(500).json({message:"Failed getPharmacist"})
  }
 }

 router.get('/getPharmacist', getPharmacist);

//view a patients's information
const getPatient = async (req, res) => {
   const Name = req.query.Name.toLowerCase();
   if (!Name) {
     return res.status(400).send({ message: 'user not filled' });
   }
 
   try {
     const Patient = await patientModel.find({ Name });
     if (!Patient) {
       return res.status(400).send({ message: 'Patirnt not found' });
     }
 
     res.status(200).json(Patient);
   } catch (error) {
     res.status(500).json({ message: 'Failed getPatient' });
   }
 }
 router.get('/getPatient', getPatient);

 //filter 
 const filterMed = async (req, res) => {
const MedicalUse = req.query.MedicalUse.toLowerCase();
if (!MedicalUse) {
  return res.status(400).send({ message: 'Please fill the input' });
}

const Medicines = await MedicineModel.find({ MedicalUse });
if (!Medicines.length) {
  return res.status(400).send({ message: 'No medicines found with the specified medical use.' });
}

res.status(200).send(Medicines)
  
 }
 router.get('/filterMedical', filterMed);


const viewReqPharm = async(req,res) =>{
try{
const pharms = await ReqPharmModel.find();
res.status(200).json(pharms);
}
catch(error){
  res.status(500).json({message:"Failed view req pharms"})
}
}
router.get('/viewReqPharm', viewReqPharm);

module.exports = router;