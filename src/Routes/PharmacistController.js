const adminModel = require('../Models/Admin');
const PharmacistModel = require('../Models/Pharmacist.js');
const admincontroller = require('./Adminph.js');
const user = require('../Models/user.js');
const { default: mongoose } = require('mongoose');
const MedicineModel = require('../Models/Medicine.js');
const OrderModel = require("../Models/Orders.js");
const express = require('express');
const multer = require('multer');
const router = express.Router();
const AdminController = require('./Adminph');
const protect = require('../middleware/authMiddleware.js');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const transactionsModel = require('../Models/transactionsModel.js');


//search for medicine based on name
router.get('/getMedicine', protect, async (req, res) => {
  let exists = await user.findById(req.user);
  if (!exists || exists.__t !== 'Pharmacist') {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const Name = req.query.Name.toLowerCase();
  if (!Name) {
    return res.status(400).send({ message: 'Please fill the input', success: false });
  }
  try {
    // const Name = req.body;
    const Medicines = await MedicineModel.findOne({ Name });
    if (!Medicines) {
      return (res.status(400).send({ message: "No Medicine with this name", success: false }));
    }
    res.status(200).json({ Result: Medicines, success: true });
  }

  catch (error) {
    res.status(500).json({ message: "Failed getMedicine", success: false })
  }
});

//add another pharmacist with a set username and password

// router.post('/createPharmacist', upload.fields([{ name: "ID" }, { name: "Degree" }, { name: "License" }]),protect, async (req, res) => {
//   let exists = await user.findById(req.user);
//   if (!exists || exists.__t !== 'Pharmacist') {
//     return res.status(500).json({
//       success: false,
//       message: "Not authorized"
//     });
//   }
//   try {

//     // Process the form data and save the pharmacist to the database
//     const Username = req.body.Username;
//     const Name = req.body.Name;
//     const Email = req.body.Email;
//     const Password = req.body.Password;
//     const DateOfBirth = req.body.DateOfBirth;
//     const HourlyRate = req.body.HourlyRate;
//     const Affiliation = req.body.Affiliation;
//     const EducationalBackground = req.body.EducationalBackground;
//     const Position = req.body.Position;

//     const userExist = await PharmacistModel.findOne({ Username });
//     if (userExist) {
//       res.status(400);
//       throw new Error('Username already exists');
//     }
//     const pharmacist = new PharmacistModel({
//       Username,
//       Name,
//       Email,
//       Password,
//       DateOfBirth,
//       HourlyRate,
//       Affiliation,
//       EducationalBackground,
//       Position,
//       ID: {
//         data: req.files.ID[0].buffer,
//         contentType: req.files.ID[0].mimetype,
//       },
//       Degree: {
//         data: req.files.Degree[0].buffer,
//         contentType: req.files.Degree[0].mimetype,
//       },
//       License: {
//         data: req.files.License[0].buffer,
//         contentType: req.files.License[0].mimetype,
//       },
//     });

//     const newPharmacist = await pharmacist.save();

//     res.status(201).json({ Result: newPharmacist, success: true });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: 'Failed OP', success: false });
//   }
// });

// ,async(req,res)=>{
//   try{
//     const Username= req.body.Username;
//     const Name = req.body.Name;
//     const Email = req.body.Email;
//     const Password = req.body.Password;
//     const DateOfBirth = req.body.DateOfBirth;
//     const HourlyRate = req.body.HourlyRate;
//     const Affiliation = req.body.Affiliation;
//     const EducationalBackground = req.body.EducationalBackground;
//     const Position = req.body.Position;
//     const userexist = await PharmacistModel.findOne({Username});
//     if(userexist){
//       res.status(400);
//       throw new Error("Username already exist");
//     }
//     if (!req.file) {
//      return res.status(400).send('No file uploaded.');
//  } 
//     const Pharmacist = new PharmacistModel({Username, Name,Email,Password,DateOfBirth,HourlyRate,Affiliation,EducationalBackground,Position,
//      Picture:{
//        data: req.file.buffer,
//        contentType: req.file.mimetype
//      }
//    });
//     const NewPharmacist = await Pharmacist.save();
//     res.status(201).json({Result : NewPharmacist, success : true }); 

//   }

//  catch (error){
//     res.status(500).json({error: 'Failed OP', success : false })
//  }
// });


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
router.get('/getCurrentPharm', protect, async (req, res) => {
  const exists = await PharmacistModel.findById(req.user);
    if (!exists || req.user.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: 'Not authorized',
      });
    }
      res.status(200).json({ Result: exists, success: true })
  
})
router.get('/getTransactionHistory', protect, async (req, res) => {
  try {
    const exists = await PharmacistModel.findById(req.user);
    if (!exists || req.user.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: 'Not authorized',
      });
    }
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000*30); // Calculate 24 hours ago
    const records = await transactionsModel.find({ createdAt: { $gte: twentyFourHoursAgo } ,userId: req.user._id});

    if (records.length === 0) {
        // Add a new record if no record exists in the last 24 hours
        exists.Wallet+=exists.HourlyRate*30;
        await exists.save();
        const newTransaction = new transactionsModel({
          amount: exists.HourlyRate*30,
          userId: req.user._id,
          paymentMethod: "Wallet",
          description: "Salary"
      });
      await newTransaction.save(); // Save the new record to the collection
    }
       
      //console.log(exists.Wallet)
      const transactions = await transactionsModel.find({ userId: req.user._id });

      res.status(200).json({
          success: true,
          transactions: transactions,
          wallet: Math.round(exists.Wallet * 100) / 100
      });
  }
  catch (error) {
      console.log(error);
      res.status(500).json({
          success: false,
          message: "Internal error mate2refnash"
      });
  }
});

router.get('/filterMedical/:MedicalUse', protect, async (req, res) => {
  try {
    const exists = await PharmacistModel.findById(req.user);
    if (!exists || req.user.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const medicalUse = req.params.MedicalUse.toLowerCase();
    console.log(medicalUse);

    if (!medicalUse) {
      return res.status(400).send({ message: 'Please fill the input', success: false });
    }

    const filteredMedicines = await MedicineModel.find({
      MedicalUse: medicalUse,
      OverTheCounter: true,
      Archived: false,
    });

    if (!filteredMedicines.length) {
      return res.status(400).send({
        message: 'No medicines found with the specified medical use and conditions.',
        success: false,
      });
    }

    console.log(filteredMedicines);
    res.status(200).send({ Result: filteredMedicines, success: true });
  } catch (error) {
    console.error('Error filtering medicine data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/findAlternatives/:Name', protect, async (req, res) => {
  try {
    let exists = await PharmacistModel.findById(req.user);
    if (!exists || req.user.__t !== "Pharmacist") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const Name = req.params.Name.toLowerCase();
    console.log(Name);

    if (!Name) {
      return res.status(400).send({ message: 'Please fill the input', success: false });
    }

    const searchedMedicine = await MedicineModel.findOne({ Name, OverTheCounter: true, Archived: false });

    if (!searchedMedicine) {
      // If the searched medicine is not found, check for alternatives based on medical use
      const alternatives = await MedicineModel.find({ MedicalUse: searchedMedicine.MedicalUse, OverTheCounter: true, Archived: false, Quantity: { $gt: 0 } });
      console.log(alternatives);
      if (alternatives.length === 0) {
        return res.status(400).send({ message: "No alternatives found for this medicine", success: false });
      }

      return res.status(200).json({ Alternatives: alternatives, success: true });
    }

    if (searchedMedicine.Quantity <= 0) {
      // If the searched medicine is out of stock, get alternatives based on medical use
      const alternatives = await MedicineModel.find({ MedicalUse: searchedMedicine.MedicalUse, OverTheCounter: true, Archived: false, Quantity: { $gt: 0 } });
      console.log(alternatives);
      if (alternatives.length === 0) {
        return res.status(400).send({ message: "Medicine is out of stock and no alternatives found", success: false });
      }

      return res.status(200).json({ Alternatives: alternatives, success: true });
    }

    return res.status(400).send({ message: "This medicine is not eligible for alternatives", success: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to find alternatives", success: false });
  }
});

router.get('/getAllMedicalUses', protect, async (req, res) => {
  try {
    let exists = await PharmacistModel.findById(req.user);
    if (!exists || req.user.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: 'Not authorized',
      });
    }

    const medicines = await MedicineModel.find({Archived:false, OverTheCounter: true});

    // Extract unique medical uses using Set
    const medicalUsesSet = new Set();
    medicines.forEach((medicine) => {
      medicine.MedicalUse.forEach((use) => {
        medicalUsesSet.add(use);
      });
    });

    const medicalUses = Array.from(medicalUsesSet);

    res.status(200).json({ success: true, medicalUses });
  } catch (error) {
    console.error('Error fetching medical uses:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});


router.post('/addMedicine', upload.single('photo'), protect, async (req, res) => {
  try {
    let exists = await user.findById(req.user);
    if (!exists || exists.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }
    // Get the ActiveIngredients and MedicalUse inputs
    const Name = req.body.Name;
    const Price = req.body.Price;
    const Quantity = req.body.Quantity;
    const ActiveIngredients = req.body.ActiveIngredients;
    const MedicalUse = req.body.MedicalUse;
    const Sales = 0;
    const overTheCounter = req.body.OverTheCounter;
    console.log(req.body.OverTheCounter);


    // Split the ActiveIngredients and MedicalUse inputs into arrays
    console.log(ActiveIngredients);
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
    const medicineExists = await MedicineModel.findOne({ Name });
    if (medicineExists) {
      res.status(400);
      throw new Error("Medicine already exists");
    }

    //router.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    // Update the medicine object with the split ActiveIngredients and MedicalUse values
    const medicine = new MedicineModel({
      Name: req.body.Name,
      Price: req.body.Price,
      Quantity: req.body.Quantity,
      Sales:Sales,
      ActiveIngredients: SplitActiveIngredients,
      MedicalUse: SplitMedicalUse,
      Picture: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      OverTheCounter: req.body.OverTheCounter,
      Archived: false,
    });

    // Save the medicine object to the database
    const NewMedicine = await medicine.save();

    // Return the new medicine object to the client
    res.status(201).json({ Result: "Medicine added ", success: true });
  } catch (error) {
    console.log(error.message);
    // Handle any errors
    res.status(400).json({ error: error.message, success: false });
  }
});


//edit medicine using name w ingredients w price w quantity
router.put('/editMedicine', protect, async (req, res) => {
  try {
    // let exists = await user.findById(req.user);
    // if (!exists || exists.__t !== 'Pharmacist') {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Not authorized"
    //   });
    //}
    const medID= req.body._id;
    const medicineName = req.body.Name;
    const newQuantity=req.body.Quantity;
    const archive=req.body.Archived;
    const newPrice = req.body.Price;
    const newOverTheCounter=req.body.OverTheCounter;
    const newIngredients = req.body.ActiveIngredients;
    console.log(req.body);
    const updateFields = {};
    updateFields.ActiveIngredients = newIngredients;
    updateFields.Price = newPrice;
    updateFields.Quantity=newQuantity;
    updateFields.Archived=archive;
    updateFields.OverTheCounter=newOverTheCounter;

    const updatedMedicine = await MedicineModel.findOneAndUpdate(
      { _id: medID },
      updateFields,
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.status(200).json(updatedMedicine);
  }
  catch (error) {
    res.status(500).json({ error: "Cannot do this" })
  }
});

//for ejs
// router.get('/editMedicine', protect, async (req, res) => {
//   try {
//     let exists = await user.findById(req.user);
//     if (!exists || exists.__t !== 'Pharmacist') {
//       return res.status(500).json({
//         success: false,
//         message: "Not authorized"
//       });
//     }
//     const medicineName = req.query.medicineName;
//     const newPrice = req.query.newPrice;
//     const newIngredients = req.query.newIngredients;
//     const updateFields = {};
//     updateFields.ActiveIngredients = newIngredients;
//     updateFields.Price = newPrice;
//     const updatedMedicine = await MedicineModel.findOneAndUpdate(
//       { Name: medicineName },
//       updateFields,
//       { new: true }
//     );
//     if (!updatedMedicine) {
//       return res.status(404).json({ error: 'Medicine not found' });
//     }
//     res.status(200).json(updatedMedicine);
//   }
//   catch (error) {
//     res.status(500).json({ error: "Cannot do this" })
//   }
// });


//view the quantity and sales of a medicine
router.get('/getinfoMeds', protect, async (req, res) => {
  //retrieve all users from the database
  try {
    let exists = await user.findById(req.user);
    if (!exists || exists.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }
    const meds = await MedicineModel.find().select({
      Name: 1,
      Quantity: 1,
      Sales: 1,
    });;
    res.status(200).json({ Result: meds, success: true });
  }

  catch (error) {
    res.status(500).json({ message: "No Medicine listed", success: false })
  }
})

//SELL MEDICINE 
// router.get('/sellMedicine', protect, async (req, res) => {
//   try {
//     let exists = await user.findById(req.user);
//     if (!exists || exists.__t !== 'Pharmacist') {
//       return res.status(500).json({
//         success: false,
//         message: "Not authorized"
//       });
//     }
//     let medicineName = req.query.medicineName.toLowerCase();
//     let medcheck = await MedicineModel.findOne({ Name: medicineName });

//     if (!medcheck) {
//       res.status(404).json({ message: "Medicine doesn't exist", success: false });
//       return;
//     }

//     if (medcheck.Quantity === 0) {
//       res.status(500).json({ message: "Medicine out of stock", success: false });
//       return;
//     }
//     let updateFields = {};
//     updateFields.Quantity = --medcheck.Quantity;
//     updateFields.Sales = ++medcheck.Sales;
//     medcheck = await MedicineModel.findOneAndUpdate(
//       { Name: medicineName },
//       updateFields,
//       { new: true }
//     );
//     console.log(medcheck.Name);
//     console.log(medcheck.Quantity--);
//     console.log(medcheck.Sales++);

//     res.status(200).json({ message: "Medicine sold successfully", success: true });
//   }
//   catch (error) {
//     res.status(500).json({ message: "Error in selling medicine", success: false });
//   }
// });


// 7assab kalam paula ejs 
// router.get('/get-image/:id', protect, async (req, res) => {
//   try {
//     let exists = await user.findById(req.user);
//     if (!exists || exists.__t !== 'Pharmacist') {
//       return res.status(500).json({
//         success: false,
//         message: "Not authorized"
//       });
//     }
//     const medicine = await MedicineModel.findById(req.params.id);
//     if (!medicine) {
//       return res.status(404).send('Medicine not found');
//     }
//     console.log(medicine.Picture.contentType);
//     res.set('Content-Type', medicine.Picture.contentType);
//     res.send(medicine.Picture.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error retrieving the image.');
//   }
// });

//archive a medicine 
router.put('/archiveMedicine/:id', protect, async (req, res) => {
  try {
    let exists = await user.findById(req.user);
    if (!exists || exists.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const medicineId = req.params.id;
    const updatedMedicine = await MedicineModel.findByIdAndUpdate(
      {_id: medicineId},
      { Archived: true },
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ error: "Cannot archive medicine" });
  }
});


// unarchived medicine
router.put('/unarchiveMedicine/:id', protect, async (req, res) => {
  try {
    let exists = await user.findById(req.user);
    if (!exists || exists.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const medicineId = req.params.id;
    const updatedMedicine = await MedicineModel.findByIdAndUpdate(
      medicineId,
      { Archived: false },
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ error: "Cannot unarchive medicine" });
  }
});

// view total sales report based on chosen month
// Route to get the total sales report for a chosen month
router.get('/totalSalesReport/:chosenMonth', protect, async (req, res) => {
  try {
    // Check if the user is authorized (Pharmacist)
    let exists = await user.findById(req.user);
    if (!exists || exists.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    // Get the chosen month from the route parameters
    const chosenMonth = req.params.chosenMonth;

    // Validate the chosenMonth parameter
    if (!chosenMonth || isNaN(chosenMonth) || parseInt(chosenMonth) < 1 || parseInt(chosenMonth) > 12) {
      return res.status(400).json({ message: 'Please provide a valid month (1-12)', success: false });
    }

    // Perform a query to get the total sales for the chosen month from the Orders model
    const totalSales = await OrderModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$createdAt' }, parseInt(chosenMonth)]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          medicinesSold: {
            $push: {
              $map: {
                input: '$items',
                as: 'item',
                in: {
                  medicine: '$$item.medicineId',
                  quantity: '$$item.quantity',
                  price: '$$item.price', // Include the price in the response
                  totalPrice: { $multiply: ['$$item.quantity', '$$item.price'] }
                }
              }
            }
          }
        }
      }
    ]);

    // Check if there are any results
    if (totalSales.length === 0) {
      return res.status(404).json({ message: 'No sales for the chosen month', success: false });
    }

    // Flatten the medicinesSold array and resolve medicine details
    const medicinesSold = totalSales[0].medicinesSold.flat();
    const medicinesDetails = await resolveMedicineDetails(medicinesSold);

    // Return the total sales, total quantity sold, and medicine details for the chosen month
    res.status(200).json({ Result: { totalSales: totalSales[0].totalSales, totalQuantitySold: totalSales[0].totalQuantitySold, medicinesSold: medicinesDetails }, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving total sales report", success: false });
  }
});

router.get('/totalSalesReport', protect, async (req, res) => {
  try {
    // Check if the user is authorized (Pharmacist)
    let exists = await user.findById(req.user);
    if (!exists || exists.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    // Get the chosen month from the route parameters
    const chosenMonth = req.params.chosenMonth;



    // Perform a query to get the total sales for the chosen month from the Orders model
    const totalSales = await OrderModel.aggregate([
      // {
      //   $match: {
      //     $expr: {
      //       $eq: [{ $month: '$createdAt' }, parseInt(chosenMonth)]
      //     }
      //   }
      // },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          medicinesSold: {
            $push: {
              $map: {
                input: '$items',
                as: 'item',
                in: {
                  medicine: '$$item.medicineId',
                  quantity: '$$item.quantity',
                  price: '$$item.price', // Include the price in the response
                  totalPrice: { $multiply: ['$$item.quantity', '$$item.price'] }
                }
              }
            }
          }
        }
      }
    ]);

    // Check if there are any results
    if (totalSales.length === 0) {
      return res.status(404).json({ message: 'No sales for the chosen month', success: false });
    }

    // Flatten the medicinesSold array and resolve medicine details
    const medicinesSold = totalSales[0].medicinesSold.flat();
    const medicinesDetails = await resolveMedicineDetails(medicinesSold);

    // Return the total sales, total quantity sold, and medicine details for the chosen month
    res.status(200).json({ Result: { totalSales: totalSales[0].totalSales, totalQuantitySold: totalSales[0].totalQuantitySold, medicinesSold: medicinesDetails }, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving total sales report", success: false });
  }
});


// Helper function to resolve medicine details
async function resolveMedicineDetails(medicinesSold) {
  const medicineDetails = [];
  for (const item of medicinesSold) {
    const medicine = await MedicineModel.findById(item.medicine);
    if (medicine) {
      const totalPrice = item.quantity * item.price;
      medicineDetails.push({
        medicineName: medicine.Name,
        quantitySold: item.quantity,
        price: item.price,
        totalPrice: totalPrice
      });
    }
  }
  return medicineDetails;
}

//filter sales report based on chosen medicine/date
router.get('/filterSalesReport/:medicineName/:chosenDate', protect, async (req, res) => {
  try {
    // Check if the user is authorized (Pharmacist)
    let exists = await user.findById(req.user);
    if (!exists || exists.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    // Get the parameters from the route params
    const medicineName = req.params.medicineName;
    const chosenDate = req.params.chosenDate;

    // Validate the parameters
    if ((!medicineName && !chosenDate) || (chosenDate && isNaN(Date.parse(chosenDate)))) {
      return res.status(400).json({ message: 'Please provide a valid medicineName or chosenDate', success: false });
    }

    // Prepare the match object based on the provided parameters
    let match = {};
    if (medicineName) {
      // console.log(medicineName);
      const medicine = await MedicineModel.findOne({ Name: medicineName }).select("-Picture");
      console.log(medicine)
      // console.log("MEDICINE"+ medicine)
      // console.log(medicine!==null||medicine!={});
      if (medicine!==null||medicine!={}) {
        match['items.medicineId'] = medicine._id;
      } else {
        // If medicineName is provided but not found, return no sales
        return res.status(404).json({ message: 'No sales for the provided medicineName', success: false });
      }
    }
    if (chosenDate) {
      const currentYear = new Date().getFullYear();
    //  console.log("YEAR:"+currentYear);
      const startOfMonth = new Date(chosenDate);
      startOfMonth.setFullYear(currentYear);
  startOfMonth.setDate(1);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to the next month
  endOfMonth.setDate(endOfMonth.getDate() - 1); 
  
      // console.log("Start of the month"+startOfMonth);
      // console.log("End of the month"+endOfMonth);
      match['createdAt'] = {
        // $gte: new Date(chosenDate),
        // $lt: new Date(new Date(chosenDate).setDate(new Date(chosenDate).getDate() + 1)) // Next day to include all sales on the chosen date
        $gte:startOfMonth,
        $lt:endOfMonth
      };
    }
    console.log(match);
    // Perform a query to get the filtered sales report from the Orders model
    const salesReport = await OrderModel.aggregate([
      {
        $match: match
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          medicinesSold: {
            $push: {
              $map: {
                input: '$items',
                as: 'item',
                in: {
                  medicine: '$$item.medicineId',
                  quantity: '$$item.quantity',
                  price: '$$item.price' , // Include the price in the response 
                  totalPrice: { $multiply: ['$$item.quantity', '$$item.price'] }
                }
              }
            }
          }
        }
      }
    ]);

    // Check if there are any results
    
    if (salesReport.length === 0) {
      return res.status(404).json({ message: 'No sales for the provided criteria', success: false });
    }

    // Flatten the medicinesSold array and resolve medicine details
    const medicinesSold = salesReport[0].medicinesSold.flat();
    const medicinesDetails = await resolveMedicineDetails(medicinesSold);

    // Return the filtered sales report, total sales, and medicine details
    res.status(200).json({ Result: { filteredSalesReport: salesReport[0], medicinesSold: medicinesDetails }, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving filtered sales report", success: false });
  }
});

//view the amount in my wallet
router.get('/viewWalletBalance', protect, async (req, res) => {
  try {
    // Check if the user is authorized
    let exists = await user.findById(req.user);
    if (!exists || exists.__t !== 'Pharmacist') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    // Find the pharmacist for the logged-in user
    const pharmacist = await PharmacistModel.findOne({ _id: req.user });

    // Check if the pharmacist exists
    if (!pharmacist) {
      return res.status(404).json({ message: 'Pharmacist not found', success: false });
    }

    // Access the wallet balance directly from the pharmacist model
    const walletBalance = pharmacist.Wallet;

    // Return the wallet balance
    res.status(200).json({ Result: { balance: walletBalance }, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving wallet balance", success: false });
  }
});

router.get('/getAllMedicines', protect, async (req, res) => {
  try {
    let exists = await PharmacistModel.findById(req.user);
    if (!exists || req.user.__t != "Pharmacist") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const meds = await MedicineModel.find();

    router.get('/getMedicineById/:id', protect, async (req, res) => {
      try {
        let exists = await PharmacistModel.findById(req.user);
        if (!exists || req.user.__t != "Pharmacist") {
          return res.status(500).json({
            success: false,
            message: "Not authorized"
          });
        }
        const id = req.params.id;
        const meds = await MedicineModel.findById(id);
    
        // const medicines = data.Result.filter((medicine) => medicine.Picture);
        res.status(200).json({ success: true, meds });
      } catch (error) {
        console.error('Error fetching medicine data:', error);
        res.status(500).json({ success: false, message: error.message });
      }
    });
    
    // const medicines = data.Result.filter((medicine) => medicine.Picture);
    res.status(200).json({ success: true, meds });
  } catch (error) {
    console.error('Error fetching medicine data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});


module.exports = router;
