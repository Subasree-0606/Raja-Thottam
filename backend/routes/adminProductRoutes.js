const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../utils/authMiddleware');
const admin = require('../utils/adminMiddleware');

// GET /api/admin/products
router.get('/', auth, admin, async (req, res) => {
  const items = await Product.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/admin/products
router.post('/', auth, admin, async (req, res) => {
  const body = req.body || {};
  if (!body.name || !body.slug || body.price == null) return res.status(400).json({ error: 'Missing fields' });
  const created = await Product.create({
    name: body.name,
    slug: body.slug,
    description: body.description || '',
    price: body.price,
    image: body.image || '',
    categories: body.categories || [],
    stock: body.stock || 0,
    tags: body.tags || [],
  });
  res.status(201).json(created);
});

// PUT /api/admin/products/:id
router.put('/:id', auth, admin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// DELETE /api/admin/products/:id
router.delete('/:id', auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
