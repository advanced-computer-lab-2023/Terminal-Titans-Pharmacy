// External variables
const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
mongoose.set('strictQuery', false);
require("dotenv").config();
const jwt = require('jsonwebtoken');

// const {createAdmin, deleteAdmin, getMedicine, getListMed, getPharmacist, getPatient} = require("./Routes/Adminph");
const MongoURI = process.env.MONGO_URI;
//App variables
const app = express();
const port = process.env.PORT || "8000";

const Admin = require('./Routes/Adminph.js');
const Patient = require('./Routes/PatientController.js');
const Pharmacist = require('./Routes/PharmacistController.js');
const securityModule=require('./Routes/securityRoute.js')

const ejs = require('ejs');
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!")
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    })
  })
  .catch(err => console.log(err));
/*
                                                    Start of your code
*/



app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
}
);

app.get("", (req, res) => {
  res.render('Home.ejs')
}
);



//view engine


// #Routing to userController here
const cors = require('cors');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/Admin', Admin);
app.use('/Patient',Patient);
app.use('/Pharma', Pharmacist);
app.use('/security',securityModule)

app.get('/Admin', (req, res) => {
  res.render('AdminPage.ejs')
})
app.get('/Patient', (req, res) => {
  res.render('PatientPage.ejs')
})
app.get('/Pharma', (req, res) => {
  res.render('PharmacistPage.ejs')
})
app.set('view engine', 'ejs');

// app.post("/createAdmin",createAdmin);
// app.get("/getMedicine", getMedicine);
// app.delete("/deleteAdmin", deleteAdmin);
// app.get("/getListMed", getListMed);
// app.get("/getPharmacist", getPharmacist);
// app.get("/getPatient", getPatient);


/*
                                                    End of your code
*/