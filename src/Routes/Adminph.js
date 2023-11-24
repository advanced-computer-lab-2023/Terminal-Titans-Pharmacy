const adminModel = require('../Models/Admin.js');
const protect = require('../middleware/authMiddleware.js');
const phModel = require('../Models/Pharmacist.js');
const patientModel = require('../Models/Patient.js');
const MedicineModel = require('../Models/Medicine.js');
const ReqPharmModel = require('../Models/requestedPharmacist.js');
const userModel = require('../Models/user.js')
const OrderModel = require("../Models/Orders.js");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//App variables
const app = express();
app.use(express.urlencoded({ extended: false }))

router.post('/createAdmin',protect, async (req, res) => {
    let exists = await adminModel.findById(req.user);
    if (!exists || req.user.__t != "Admin") {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }
    
  const Username = req.body.Username.toLowerCase();
  const Pass = req.body.Pass;
  const Position = 'Admin';
  if (!req.body.Username) {
    return (res.status(400).send({ message: "user not filled " }));

  }
  if (!req.body.Pass) {
    return (res.status(400).send({ message: "pass not filled " }));
  }

  try {
    const userexist = await userModel.findOne({ Username });
    if (userexist) {
      throw new Error('Username already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Pass, salt)

    const admin = new adminModel({ Username: Username, Password: hashedPassword, Position: Position });
    const Nadmin = await admin.save();
    res.status(201).json({ Result: Nadmin, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

const deleteAdmin = async (req, res) => {
  
  const Username = req.query.Username.toLowerCase();
  if (!Username) {
    return res.status(400).send({ message: 'user not filled' });
  }

  try {
    const dph = await phModel.findOneAndRemove({ Username });
    const dPatient = await patientModel.findOneAndRemove({ Username });

    if (!dph && !dPatient) {
      res.status(404).json({ message: 'user not found', success: false });
    } else {
      res.status(200).json({ message: 'Admin has deleted successfully.', success: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', success: false });
  }
};
router.get('/deleteAdmin', async (req, res) => {
  // Handle GET requests.
  const Username = req.query.Username.toLowerCase();

  // If the username is not present, return a 400 Bad Request response.
  if (!Username) {
    return res.status(400).json({ message: 'Username is required.', success: false });
  }

  // Try to find the admin in the database.
  const dph = await phModel.findOneAndRemove({ Username });
  const dPatient = await patientModel.findOneAndRemove({ Username });

  if (!dph && !dPatient) {
    res.status(404).json({ message: 'user not found', success: false });
  } else {
    res.status(200).json({ message: 'Admin has deleted successfully.', success: true });
  }
});

router.delete('/deleteAdmin', deleteAdmin);


//search for medicine based on name
const getMedicine = async (req, res) => {
  const Name = req.params.Name.toLowerCase();
  console.log(Name)
  if (!Name) {
    return res.status(400).send({ message: 'Please fill the input' });
  }
  try {
    // const Name = req.body;
    const Medicines = await MedicineModel.findOne({ Name });
    if (!Medicines) {
      return (res.status(400).send({ message: "No Medicine with this name" }));
    }
    res.status(200).json({ Result: Medicines, success: true });
  }

  catch (error) {
    res.status(500).json({ message: "Failed getMedicine", success: false })
  }
}

router.get('/getMedicine/:Name', getMedicine);


//view a list of all available medicines (including picture of medicine, price, description)

router.get('/getAllMedicine', protect, async (req, res) => {
  //retrieve all users from the database
  try {
    let user = await adminModel.findById(req.user);
    if (!user || user.__t !== 'Admin') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }

    const meds = await MedicineModel.find();
    res.status(200).json({ Result: meds, success: true });
  }

  catch (error) {
    res.status(500).json({ message: "No Medicine listed", success: false })
  }
});
//view a pharmacist's information










router.get('/getPharmacist', protect, async (req, res) => {
  const Name = req.query.Name.toLowerCase();
  console.log(Name);
  let user = await adminModel.findById(req.user);
  if (!user || user.__t !== 'Admin') {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  if (!Name) {
    return res.status(400).send({ message: 'user not filled ', success: false });
  }
  try {
    const Pharma = await phModel.find({ Name: Name });
    if (!Pharma || Pharma.length === 0) {
      return (res.status(400).send({ message: "Pharmacist Not Found", success: false }));
    }
    res.status(200).json({ Pharma, success: true });
  }

  catch (error) {
    res.status(500).json({ message: "Failed getPharmacist", success: false })
  }
});

//view a patients's information

router.get('/getPatient', protect, async (req, res) => {
  let user = await adminModel.findById(req.user);
  if (!user || user.__t !== 'Admin') {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const Name = req.query.Name.toLowerCase();
  if (!Name) {
    return res.status(400).send({ message: 'user not filled', success: false });
  }

  try {
    const Patient = await patientModel.find({ Name });
    if (!Patient || Patient.length === 0) {
      return res.status(400).send({ message: 'Patient not found', success: false });
    }

    res.status(200).json({ Result: Patient, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed getPatient', success: false });
  }
});

//filter 
router.get('/filterMedical/:MedicalUse', protect, async (req, res) => {
  let user = await adminModel.findById(req.user);
  if (!user || user.__t !== 'Admin') {
    return res.status(500).json({
      success: false,
      message: "Not authorized"
    });
  }
  const MedicalUse = req.params.MedicalUse.toLowerCase();
  if (!MedicalUse) {
    return res.status(400).send({ message: 'Please fill the input', success: false });
  }

  const Medicines = await MedicineModel.find({ MedicalUse });
  if (!Medicines.length) {
    return res.status(400).send({ message: 'No medicines found with the specified medical use.', success: false });
  }

  res.status(200).send({ Result: Medicines, success: true })

});


router.get('/viewReqPharm', protect,async (req, res) => {
  try {
    let user = await adminModel.findById(req.user);
    if (!user || user.__t !== 'Admin') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }
    const pharms = await ReqPharmModel.find();
    res.status(200).json({ Result: pharms, success: true });
  }
  catch (error) {
    res.status(500).json({ message: "Failed view req pharms" })
  }
});

router.post('/Acceptance/:username', protect, async (req, res) => {
  try {
    let exists = await adminModel.findById(req.user);
    if (!exists || exists.__t !== 'Admin') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }
    const { username } = req.params
    console.log(username, req.params.username);
    const user = await ReqPharmModel.findOne({ Username: username });
    console.log(user);
    if (user) {
      await ReqPharmModel.deleteOne(user);

      const pharmacist = new phModel({
        Username: user.Username,
        Password: user.Password,
        Name: user.Name,
        Email: user.Email,
        DateOfBirth: user.DateOfBirth,
        HourlyRate: user.HourlyRate,
        Affiliation: user.Affiliation,
        EducationalBackground: user.EducationalBackground,
        ID: user.ID,
        Degree: user.Degree,
        License: user.License
      })
      await pharmacist.save();
      let myResult = await ReqPharmModel.find();
      res.status(200).json({
        success: true,
        message: "Pharmacist accepted successfully",
        Result:myResult
      });
    }
    else {
      res.status(500).json({
        success: false,
        message: "There are no pharmacists to accept"
      });
    }
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

router.delete('/Rejection/:username', protect, async (req, res) => {
  try {
    let exists = await adminModel.findById(req.user);
    if (!exists || exists.__t !== 'Admin') {
      return res.status(500).json({
        success: false,
        message: "Not authorized"
      });
    }
    const { username } = req.params;
    const user = await ReqPharmModel.findOne({ Username: username });
    if (user) {
      await ReqPharmModel.deleteOne(user);
      let myResult = await ReqPharmModel.find();
      res.status(200).json({
        success: true,
        message: "Pharmacist rejected successfully",
        Result:myResult
      });
    }
    else {
      res.status(500).json({
        success: false,
        message: "Pharmacist doesn't exist"
      });
    }
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

router.get('/totalSalesReport/:chosenMonth', protect, async (req, res) => {
  try {
    // Check if the user is authorized (Pharmacist)
    let exists = await adminModel.findById(req.user);
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
                  price: '$$item.price' // Include the price in the response
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
      medicineDetails.push({
        medicineName: medicine.Name,
        quantitySold: item.quantity,
        price: item.price
      });
    }
  }
  return medicineDetails;
}
module.exports = router;