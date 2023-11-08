
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [
      {
        medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
        quantity: Number,
        price: Number,
      },
    ],
    total: Number,
    status: {
      type : String,
      required: false
    }
  });

  
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;