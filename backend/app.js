require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rajathottam', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB error:', err));

// Routes
app.get('/', (req, res) => res.json({ message: 'Raja Thottam Backend API' }));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/guides', require('./routes/guideRoutes'));
// Mount API endpoint files as they are built:
// app.use('/api/auth', require('./routes/authRoutes'));
// ... etc.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
