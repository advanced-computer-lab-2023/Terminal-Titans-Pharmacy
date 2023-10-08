const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel=require('./user.js')
const PharmacistSchema = new Schema({
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
    }
  }, { timestamps: true });
  
  const ReqPharmacist = userModel.discriminator('ReqPharmacist', PharmacistSchema);
  module.exports = ReqPharmacist;