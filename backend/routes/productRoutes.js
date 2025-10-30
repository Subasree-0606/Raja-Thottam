const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products -- List all products (mock filters for now)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET /api/products/:slug -- Single product detail
router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
