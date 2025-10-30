const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: String,
  content: String,
  tags: [String],
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Guide', guideSchema);
