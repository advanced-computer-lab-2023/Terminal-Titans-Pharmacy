const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
    isVerified:{
      type:Boolean,
      default:false
    }
  });
const otp = mongoose.model('otp', otpSchema);
module.exports = otp;