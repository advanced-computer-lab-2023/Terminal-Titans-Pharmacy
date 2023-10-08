const adminModel = require('../Models/Admin');
const PharmacistModel = require('../Models/Pharmacist.js');
const admincontroller = require('./Adminph.js');
const { default: mongoose } = require('mongoose');
const MedicineModel = require('../Models/Medicine.js');
//const {getMedicine} = require("./Adminph.js");
const express = require('express');
const router = express.Router();
const AdminController = require('./Adminph');



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

//add another pharmacist with a set username and password
const createPharmacist = async(req,res) => {
    try{
       const Username= req.body.Username;
       const Name = req.body.Name;
       const Email = req.body.Email;
       const Password = req.body.Password;
       const DateOfBirth = req.body.DateOfBirth;
       const HourlyRate = req.body.HourlyRate;
       const Affiliation = req.body.Affiliation;
       const EducationalBackground = req.body.EducationalBackground;
       const Position = req.body.Position;
       const userexist = await PharmacistModel.findOne({Username});
       if(userexist){
         res.status(400);
         throw new Error("Username already exist");
       }
       const Pharmacist = new PharmacistModel({Username, Name,Email,Password,DateOfBirth,HourlyRate,Affiliation,EducationalBackground,Position});
       const NewPharmacist = await Pharmacist.save();
       res.status(201).json(NewPharmacist);  
     }
    catch (error){
       res.status(500).json({error: 'Failed OP'})
    }
 }
router.post('/createPharmacist', createPharmacist);
   //add a medicine using name w ingredients w price w quantity
   const addMedicine = async (req, res) => {
    try{
       const Name = req.body.Name;
       const Price = req.body.Price;
       const Quantity = req.body.Quantity;
       const ActiveIngredients = req.body.ActiveIngredients;
       const MedicalUse = req.body.MedicalUse;
       const medicineExists = await MedicineModel.findOne({Name});
     if(medicineExists){
       res.status(500);
       throw new Error("Medicine already exists");
     }
       const medicine = new MedicineModel({Name,Price,Quantity,ActiveIngredients,MedicalUse});
       const NewMedicine = await medicine.save();
       res.status(201).json(NewMedicine);
     
    }
    catch(error){
       res.status(500).json({error:"Cannot do this"})
    }

 }
 router.post('/addMedicine',addMedicine);
//Edit a medicine
const editMedicine = async (req, res) => {
    try{
    const medicineName = req.body.medicineName;
    const newPrice = req.body.newPrice;
    const newIngredients = req.body.newIngredients;
    const updateFields = {};
    updateFields.ActiveIngredients = newIngredients;
    updateFields.Price = newPrice;
    const updatedMedicine = await MedicineModel.findOneAndUpdate(
      {Name: medicineName },
      updateFields,
      { new: true }
    );
    if (!updatedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.status(200).json(updatedMedicine);
   }
   catch(error){
    res.status(500).json({error:"Cannot do this"})
 }
}
router.put('/editMedicine',editMedicine);


   module.exports={editMedicine,addMedicine,createPharmacist};
   module.exports = router;