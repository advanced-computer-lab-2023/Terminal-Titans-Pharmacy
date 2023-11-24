const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
  Name: {
    type: String,
    required: true,
    unique: true
  },
  Price: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  Sales:{
    type : Number,
    required: false
  },
  ActiveIngredients: {
    type: Array,
    required: true
  },
  MedicalUse: {
    type: Array,
    required: true
  },
  Picture: {
    data: Buffer,
    contentType:String,
    required: false
  },
  OverTheCounter: {
    type: Boolean,
    required: true
  },
  Archived: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', MedicineSchema);
module.exports = Medicine;