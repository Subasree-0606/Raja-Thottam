const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../utils/authMiddleware');

// POST /api/orders - create order
router.post('/', auth, async (req, res) => {
  const { items = [], address = {}, paymentMethod = 'COD' } = req.body;
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'No items' });

  // calculate totals using DB prices to avoid tampering
  const ids = items.map(i => i.product);
  const products = await Product.find({ _id: { $in: ids } });
  const productMap = new Map(products.map(p => [String(p._id), p]));

  const normalized = items.map(i => {
    const p = productMap.get(String(i.product));
    return { product: p._id, name: p.name, price: p.price, qty: Math.max(1, i.qty || 1) };
  });
  const subtotal = normalized.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  const order = await Order.create({
    user: req.userId,
    items: normalized,
    subtotal,
    shipping,
    total,
    address,
    paymentMethod,
    paymentStatus: paymentMethod === 'COD' ? 'pending' : 'initiated',
  });

  res.status(201).json({ orderId: order._id, total });
});

// GET /api/orders/:id - get order
router.get('/:id', auth, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product', 'name price');
  if (!order) return res.status(404).json({ error: 'Order not found' });
  if (String(order.user) !== String(req.userId)) return res.status(403).json({ error: 'Forbidden' });
  res.json(order);
});

module.exports = router;
