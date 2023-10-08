const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel=require('./user');

const PatientSchema = new Schema({
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
    Gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
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
    }
  }, { timestamps: true });
  
  const Patient = userModel.discriminator('Patient', PatientSchema);
  module.exports = Patient;
