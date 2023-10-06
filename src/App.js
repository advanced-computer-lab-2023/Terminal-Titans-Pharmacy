// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
// const {createAdmin, deleteAdmin, getMedicine, getListMed, getPharmacist, getPatient} = require("./Routes/Adminph");
const MongoURI = process.env.MONGO_URI;



//App variables
const app = express();
const port = process.env.PORT || "8000";

const Admin = require('./Routes/Adminph.js');
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


//view engine


// #Routing to userController here

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/Admin', Admin);

app.get('/Admin', (req, res) => {
  res.render('AdminPage.ejs')
})
// app.get('/Admin', (req, res) => {
//   res.render('getPharmacist.ejs')
// })
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