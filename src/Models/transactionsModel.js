
const mongoose=require('mongoose');
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    amount: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    
  paymentMethod: {
    type: String,
    
  },
},{ timestamps: true});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;