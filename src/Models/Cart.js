const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }, // If you have user authentication
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }, // Reference to the medicine schema
  quantity: { type: Number, default: 1 },
  price: { type: Number },
  // You can add other fields as needed
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;