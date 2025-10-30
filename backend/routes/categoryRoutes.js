const express = require('express');
const router = express.Router();

const CATEGORIES = [
  'Indoor Plants',
  'Outdoor Plants',
  'Seeds',
  'Pots & Planters',
  'Fertilizers & Soil',
  'Tools & Accessories',
  'Aggregates',
  'Farm Inputs'
];

router.get('/', (req, res) => res.json(CATEGORIES));

module.exports = router;
