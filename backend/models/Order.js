const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  qty: Number,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  subtotal: Number,
  shipping: { type: Number, default: 0 },
  total: Number,
  address: {
    name: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
  },
  paymentMethod: { type: String, default: 'COD' },
  paymentStatus: { type: String, default: 'pending' },
  status: { type: String, default: 'created' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
