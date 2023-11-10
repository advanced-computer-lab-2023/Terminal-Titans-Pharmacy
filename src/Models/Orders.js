
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    items: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
        quantity: Number,
        price: Number,
      },
    ],
    total: Number,
    status: {
      type : String,
      required: false
    },
    address: {
      type : String,
      required: false
    }
  });

  
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;