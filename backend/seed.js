require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Guide = require('./models/Guide');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rajathottam';

async function run() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  await Product.deleteMany({});
  await Guide.deleteMany({});

  const products = [
    { name: 'Money Plant', slug: 'money-plant', description: 'Low-maintenance, air-purifying indoor plant.', price: 349, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', categories: ['Indoor Plants'], stock: 25, tags: ['indoor','air purifier'] },
    { name: 'Rose Seeds', slug: 'rose-seeds', description: 'Grow beautiful, fragrant roses.', price: 99, image: 'https://images.unsplash.com/photo-1438109491414-7198515b166b?auto=format&fit=crop&w=400&q=80', categories: ['Seeds'], stock: 100, tags: ['seeds'] },
    { name: 'Areca Palm', slug: 'areca-palm', description: 'Graceful palm; pet-friendly.', price: 499, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', categories: ['Indoor Plants'], stock: 15, tags: ['indoor','palm'] },
    { name: 'Ceramic Pot (6-inch)', slug: 'ceramic-pot-6in', description: 'Durable glazed ceramic pot.', price: 199, image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=400&q=80', categories: ['Pots & Planters'], stock: 60, tags: ['pots'] },
    { name: 'Organic Fertilizer', slug: 'organic-fertilizer', description: '100% organic for all garden plants.', price: 129, image: 'https://images.unsplash.com/photo-1438109491414-7198515b166b?auto=format&fit=crop&w=400&q=80', categories: ['Fertilizers'], stock: 80, tags: ['fertilizer','organic'] },
    { name: 'Garden Pruner', slug: 'garden-pruner', description: 'High quality pruning shears.', price: 229, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', categories: ['Garden Tools'], stock: 40, tags: ['tools'] },
    { name: 'Succulent Combo (Set of 5)', slug: 'succulent-combo-5', description: 'Cute, easy-care succulents.', price: 599, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', categories: ['Indoor Plants'], stock: 12, tags: ['succulents'] },
    { name: 'Pebble Pack', slug: 'pebble-pack', description: 'Decorative river pebbles.', price: 79, image: 'https://images.unsplash.com/photo-1508975556754-c425eee0b237?auto=format&fit=crop&w=400&q=80', categories: ['Accessories'], stock: 150, tags: ['pebbles','decor'] },
  ];

  const guides = [
    { title: 'Monsoon Planting Guide', slug: 'monsoon-planting-guide', summary: 'Get the most from your garden during monsoon.', content: 'Long-form content about monsoon planting...', tags: ['monsoon','seasonal'], image: 'https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=800&q=80' },
    { title: 'Best Indoor Plants for Low Light', slug: 'best-indoor-plants-low-light', summary: 'Top shade-loving plants.', content: 'Long-form content about low light plants...', tags: ['indoor','low-light'], image: 'https://images.unsplash.com/photo-1444392069727-6e16b8c8a8b9?auto=format&fit=crop&w=800&q=80' },
  ];

  await Product.insertMany(products);
  await Guide.insertMany(guides);

  console.log('Seed completed');
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
