const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel=require('./user');

const PatientSchema = new Schema({
    Username: {
      type: String,
      required: true,
      unique : true
    },
    Name: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true,
      unique: true
    },
    DateOfBirth:{
      type:Date,
      required:true,
    },
    Gender: {
        type: String,
        enum: ['male', 'female', 'Other'],
        required: true
    },
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
    },
    address: {
      type : Array,
      required: false
    }

  }, { timestamps: true });
  
  const Patient = userModel.discriminator('Patient', PatientSchema);
  module.exports = Patient;
