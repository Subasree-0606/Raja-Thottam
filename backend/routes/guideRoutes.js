const express = require('express');
const router = express.Router();
const Guide = require('../models/Guide');

// GET /api/guides
router.get('/', async (req, res) => {
  const guides = await Guide.find().sort({ createdAt: -1 });
  res.json(guides);
});

// GET /api/guides/:slug
router.get('/:slug', async (req, res) => {
  const guide = await Guide.findOne({ slug: req.params.slug });
  if (!guide) return res.status(404).json({ error: 'Guide not found' });
  res.json(guide);
});

module.exports = router;
