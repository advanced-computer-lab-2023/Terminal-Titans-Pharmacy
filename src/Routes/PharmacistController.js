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
    return res.status(400).send({ message: 'Please fill the input', success : false  });
  }
  try{
    // const Name = req.body;
     const Medicines= await MedicineModel.findOne({Name});
     if (!Medicines){
       return(res.status(400).send({message: "No Medicine with this name", success : false }));
     }
     res.status(200).json({Redult : Medicines, success : true });
     }
  
  catch(error){
     res.status(500).json({message:"Failed getMedicine", success : false })
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
       res.status(201).json({Result : NewPharmacist, success : true });  
     }
    catch (error){
       res.status(500).json({error: 'Failed OP', success : false })
    }
 }
router.post('/createPharmacist', createPharmacist);
   //add a medicine using name w ingredients w price w quantity
//    const addMedicine = async (req, res) => {
//     try{
//        const Name = req.body.Name;
//        const Price = req.body.Price;
//        const Quantity = req.body.Quantity;
//        const ActiveIngredients = req.body.ActiveIngredients;
//        const MedicalUse = req.body.MedicalUse;
//        const medicineExists = await MedicineModel.findOne({Name});
//      if(medicineExists){
//        res.status(500);
//        throw new Error("Medicine already exists");
//      }
//        const medicine = new MedicineModel({Name,Price,Quantity,ActiveIngredients,MedicalUse});
//        const NewMedicine = await medicine.save();
//        res.status(201).json({Result : NewMedicine , success : true });
     
//     }
//     catch(error){
//        res.status(500).json({error:"Cannot do this", success : false })
//     }

//  }
const addMedicine = async (req, res) => {
  try {
    // Get the ActiveIngredients and MedicalUse inputs
    const Name = req.body.Name;
    const Price = req.body.Price;
    const Quantity = req.body.Quantity;
    const ActiveIngredients = req.body.ActiveIngredients;
    const MedicalUse = req.body.MedicalUse;

    // Split the ActiveIngredients and MedicalUse inputs into arrays
    const ActiveIngredientsArray = ActiveIngredients.split(',');
    const MedicalUseArray = MedicalUse.split(',');

    // Create an empty array to store the split ActiveIngredients and MedicalUse values
    const SplitActiveIngredients = [];
    const SplitMedicalUse = [];

    // Iterate over the ActiveIngredients and MedicalUse arrays and push each value into the SplitActiveIngredients and SplitMedicalUse arrays
    for (const ActiveIngredient of ActiveIngredientsArray) {
      SplitActiveIngredients.push(ActiveIngredient.trim());
    }

    for (const MedicalUseValue of MedicalUseArray) {
      SplitMedicalUse.push(MedicalUseValue.trim());
    }
    const medicineExists = await MedicineModel.findOne({Name});
     if(medicineExists){
       res.status(500);
       throw new Error("Medicine already exists");
     }

    // Update the medicine object with the split ActiveIngredients and MedicalUse values
    const medicine = new MedicineModel({
      Name: req.body.Name,
      Price: req.body.Price,
      Quantity: req.body.Quantity,
      ActiveIngredients: SplitActiveIngredients,
      MedicalUse: SplitMedicalUse,
    });

    // Save the medicine object to the database
    const NewMedicine = await medicine.save();

    // Return the new medicine object to the client
    res.status(201).json({ Result: NewMedicine, success: true });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'Cannot do this', success: false });
  }
};

 router.post('/addMedicine',addMedicine);
  const editMedicine = async (req, res) => {
    try{
    const medicineName = req.query.medicineName;
    const newPrice = req.query.newPrice;
    const newIngredients = req.query.newIngredients;
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

router.get('/editMedicine', async (req, res) => {
  try{
    const medicineName = req.query.medicineName;
    const newPrice = req.query.newPrice;
    const newIngredients = req.query.newIngredients;
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
});

router.put('/editMedicine',editMedicine);

const getListMed = async (req, res) => {
  //retrieve all users from the database
  try{
     const meds= await MedicineModel.find().select({
      Name:1,
      Quantity: 1,
      Sales: 1,
    });;
     res.status(200).json({Result : meds, success: true});
     }
  
  catch(error){
     res.status(500).json({message:"No Medicine listed", success : false})
  }
 }
 router.get('/getinfoMeds',getListMed)
   module.exports={addMedicine,createPharmacist};
   module.exports = router;