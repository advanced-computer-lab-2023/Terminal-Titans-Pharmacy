const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    Password: {
        type: String,
        required: true
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
  
  const Pharmacist = mongoose.model('Pharmacist', PharmacistSchema);
  module.exports = Pharmacist;