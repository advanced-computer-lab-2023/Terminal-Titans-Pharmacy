const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel=require('./user.js')
const PharmacistSchema = new Schema({
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
  
  const Pharmacist = userModel.discriminator('Pharmacist', PharmacistSchema);
  module.exports = Pharmacist;