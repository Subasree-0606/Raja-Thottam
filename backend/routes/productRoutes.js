const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products -- List products with filters/search/sort/pagination
router.get('/', async (req, res) => {
  const { q, category, sort = 'newest', page = 1, limit = 12 } = req.query;

  const filter = {};
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { tags: { $regex: q, $options: 'i' } },
    ];
  }
  if (category) {
    filter.categories = { $in: [category] };
  }

  let sortSpec = { createdAt: -1 };
  if (sort === 'price_asc') sortSpec = { price: 1 };
  if (sort === 'price_desc') sortSpec = { price: -1 };

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit) || 12, 1), 60);
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    Product.find(filter).sort(sortSpec).skip(skip).limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.json({ data: items, page: pageNum, totalPages: Math.ceil(total / limitNum), total });
});

// GET /api/products/:slug -- Single product detail
router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
