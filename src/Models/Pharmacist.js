const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel=require('./user.js')
const PharmacistSchema = new Schema({
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
      unique:true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    HourlyRate: {
        type: Number,
        required: true 
    },
    Affiliation: {
        type: String,
        required: true
    },
    EducationalBackground: {
        type: String,
        required: true 
    },
    ID: {
      data: Buffer,
      contentType:String,
      required: false
    },
    Degree: {
      data: Buffer,
      contentType:String,
      required: false
    }
,
    License: {
      data: Buffer,
      contentType:String,
      required: false
    }

  }, { timestamps: true });
  
  const Pharmacist = userModel.discriminator('Pharmacist', PharmacistSchema);
  module.exports = Pharmacist;