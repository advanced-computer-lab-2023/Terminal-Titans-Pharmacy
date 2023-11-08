const adminModel = require('../Models/Admin.js');
const protect = require('../middleware/authMiddleware.js');
const phModel = require('../Models/Pharmacist.js');
const patientModel = require('../Models/Patient.js');
const MedicineModel = require('../Models/Medicine.js');
const ReqPharmModel = require('../Models/requestedPharmacist.js');
const userModel = require('../Models/user.js')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//App variables
const app = express();
app.use(express.urlencoded({ extended: false }))

router.post('/createAdmin', async (req, res) => {
  // const exist = await adminModel.findById(req.user);
  // if (!exist) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "You are not an admin"
  //   });
  // }
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
const getListMed = async (req, res) => {
  //retrieve all users from the database
  try {
    const meds = await MedicineModel.find();
    res.status(200).json({ Result: meds, success: true });
  }

  catch (error) {
    res.status(500).json({ message: "No Medicine listed", success: false })
  }
}

router.get('/getAllMedicine', getListMed);
//view a pharmacist's information









const getPharmacist = async (req, res) => {
  const Name = req.query.Name.toLowerCase();
  console.log(Name);
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
}

router.get('/getPharmacist', getPharmacist);

//view a patients's information
const getPatient = async (req, res) => {
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
}
router.get('/getPatient', getPatient);

//filter 
const filterMed = async (req, res) => {
  const MedicalUse = req.params.MedicalUse.toLowerCase();
  if (!MedicalUse) {
    return res.status(400).send({ message: 'Please fill the input', success: false });
  }

  const Medicines = await MedicineModel.find({ MedicalUse });
  if (!Medicines.length) {
    return res.status(400).send({ message: 'No medicines found with the specified medical use.', success: false });
  }

  res.status(200).send({ Result: Medicines, success: true })

}
router.get('/filterMedical/:MedicalUse', filterMed);


const viewReqPharm = async (req, res) => {
  try {
    const pharms = await ReqPharmModel.find();
    res.status(200).json({ Result: pharms, success: true });
  }
  catch (error) {
    res.status(500).json({ message: "Failed view req pharms" })
  }
}
router.get('/viewReqPharm', viewReqPharm);

router.post('/Acceptance/:username', protect, async (req, res) => {
  try {
    const { username } = req.params
    console.log(username, req.params.username);
    const user = await ReqPharmModel.findOne({ Username:username });
    console.log(user);
    if (user) {
      await ReqPharmModel.deleteOne(user);

      const pharmacist= new phModel({
          Username: user.Username,
          Password:user.Password,
          Name: user.Name,
          Email: user.Email,
          DateOfBirth : user.DateOfBirth,
          HourlyRate: user.HourlyRate,
          Affiliation : user.Affiliation,
          EducationalBackground : user.EducationalBackground,
          ID: user.ID,
          Degree: user.Degree,
          License: user.License
      })
      await pharmacist.save();
      res.status(200).json({
        success: true,
        message: "User accepted successfully"
      });
    }
    else {
      res.status(500).json({
        success: false,
        message: "There are no users to accept"
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
    const { username } = req.params;
    const user = await ReqPharmModel.findOne({Username: username });
    if (user) {
      await ReqPharmModel.deleteOne(user);
      res.status(200).json({
        success: true,
        message: "User rejected successfully"
      });
    }
    else {
      res.status(500).json({
        success: false,
        message: "User doesn't exist"
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

module.exports = router;