const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },
  Pass: {
    type: String,
    required: true
  },
  Position: {
    type: String
  }
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;