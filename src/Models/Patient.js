const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    Password: {
        type: String,
        required: true
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
    }

  }, { timestamps: true });
  
  const Patient = mongoose.model('Patient', PatientSchema);
  module.exports = Patient;
