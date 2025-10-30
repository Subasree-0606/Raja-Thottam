const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  categories: [String],
  stock: { type: Number, default: 0 },
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
