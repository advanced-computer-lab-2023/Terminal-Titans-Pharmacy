const PharmacistModel = require('../Models/Pharmacist.js');
const { default: mongoose } = require('mongoose');
const MedicineModel = require('../Models/Medicine.js');

//add another pharmacist with a set username and password
const createPharmacist = async(req,res) => {
    try{
       const {Username, Name,Email,Password,DateOfBirth,HourlyRate,Affiliation,EducationalBackground,Position} = req.body;
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
   //add a medicine using name w ingredients w price w quantity
   const addMedicine = async (req, res) => {
    try{
       const {Name,Price,Quantity,ActiveIngredients,MedicalUse} = req.body;
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
//Edit a medicine
const editMedicine = async (req, res) => {
    try{
    const { medicineName, newPrice, newIngredients} = req.body;
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


   module.exports={editMedicine,addMedicine,createPharmacist};