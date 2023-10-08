const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    Username: {
      type: String,
      required: true,
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
    Gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
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
  
  const Patient = mongoose.model('Patient', PatientSchema);
  module.exports = Patient;
