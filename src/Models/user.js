const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userOptions={
    discriminationKey: 'usertype',
    collection:'users'
};
const userSchema = new Schema({

  Username: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  }

}, { timestamps: true },
userOptions,);

const Admin = mongoose.model('user', userSchema);
module.exports = Admin;