const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel=require('./user')

const AdminSchema = new Schema({
  Position: {
    type: String
  }
}, { timestamps: true });

const Admin = userModel.discriminator('Admin', AdminSchema);
module.exports = Admin;