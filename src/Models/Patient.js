const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel=require('./user');

const PatientSchema = new Schema({
<<<<<<< HEAD
    Username: {
      type: String,
      required: true,
      unique : true
    },
=======
>>>>>>> 8b71375b58f7620206f91151af22c44900a8768e
    Name: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true,
      unique: true
    },
    Dob:{
      type:Date,
      required:true,
    },
    DateOfBirth: {
      type : Date,
      required: true
    },
    Gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
<<<<<<< HEAD
    MobileNumber: {
        type: Number,
        required: true 
    },
    EmergencyContactFullName: {
      type : String,
      required: true
    },
    EmergencyContactMobileNumber: {
      type : Number,
      required: true
    },
    EmergencyContactRelationToThePatient: {
      type : String,
      required: true
=======
    Mobile: {
        type: String,
        required: true 
    },
    EmergencyName: {
      type: String,
      required: true
    },
    EmergencyMobile: {
      type: Number,
      required: true,
    },
    EmergencyRelation:{
      type:String,
      required:true
>>>>>>> 8b71375b58f7620206f91151af22c44900a8768e
    }

  }, { timestamps: true });
  
  const Patient = userModel.discriminator('Patient', PatientSchema);
  module.exports = Patient;
