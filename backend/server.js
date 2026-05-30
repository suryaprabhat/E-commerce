const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'], credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/', (req, res) => res.json({ message: 'E-Commerce API is running ✅' }));

// ---- Seed function ----
const seed = async () => {
  const User = require('./models/User');
  const Product = require('./models/Product');

  const userCount = await User.countDocuments();
  if (userCount > 0) {
    console.log('ℹ️  DB already seeded, skipping...');
    return;
  }

  const products = [
    { name: "Vintage Wall Clock", price: 1499, description: "Elegant vintage wall clock with a rustic finish, perfect for any room.", category: "Home Decor", rating: 4.2, reviews: 128, inStock: true, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"] },
    { name: "Modern Sofa", price: 29999, description: "Contemporary 3-seater sofa with premium fabric and ergonomic design.", category: "Furniture", rating: 4.6, reviews: 45, inStock: true, images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop"] },
    { name: "Wireless Bluetooth Headphones", price: 2499, description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.", category: "Electronics", rating: 4.5, reviews: 120, inStock: true, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"] },
    { name: "Minimalist Coffee Table", price: 4999, description: "Sleek coffee table with glass top and wooden base.", category: "Furniture", rating: 4.3, reviews: 67, inStock: true, images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&h=500&fit=crop"] },
    { name: "Decorative Throw Pillows", price: 799, description: "Set of 2 decorative throw pillows with modern patterns.", category: "Home Decor", rating: 4.1, reviews: 78, inStock: true, images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&h=500&fit=crop"] },
    { name: "Smart LED TV", price: 34999, description: "55-inch 4K Ultra HD Smart LED TV with HDR.", category: "Electronics", rating: 4.8, reviews: 256, inStock: true, images: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=500&fit=crop"] },
    { name: "Desk Lamp", price: 999, description: "Modern LED desk lamp with adjustable brightness and color temperature.", category: "Home Decor", rating: 4.4, reviews: 92, inStock: true, images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop"] },
    { name: "Dining Table Set", price: 24999, description: "6-seater dining table set with matching chairs.", category: "Furniture", rating: 4.7, reviews: 85, inStock: true, images: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop"] },
    { name: "Artificial Plants", price: 599, description: "Set of 3 artificial plants in decorative pots.", category: "Home Decor", rating: 4.0, reviews: 110, inStock: true, images: ["https://images.unsplash.com/photo-1602923668104-8f9e03e77e62?w=500&h=500&fit=crop"] },
    { name: "Bookshelf", price: 6999, description: "Modern 5-tier bookshelf with metal frame.", category: "Furniture", rating: 4.5, reviews: 65, inStock: true, images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&h=500&fit=crop"] },
    { name: "Smart Speaker", price: 3499, description: "Voice-controlled smart speaker with premium sound quality.", category: "Electronics", rating: 4.8, reviews: 67, inStock: true, images: ["https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&h=500&fit=crop"] },
    { name: "Modern Floor Lamp", price: 2999, description: "Contemporary floor lamp with adjustable height and direction.", category: "Home Decor", rating: 4.4, reviews: 89, inStock: true, images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop"] },
  ];

  await Product.insertMany(products);

  // Pass plain text — pre-save hook in User model handles hashing
  await User.create({ name: 'Admin', email: 'admin@shop.com', password: 'Admin@123', role: 'admin' });
  await User.create({ name: 'Demo User', email: 'user@shop.com', password: 'User@123', role: 'user' });

  console.log('✅ Seeded 12 products, admin + demo user');
};

// ---- Start server ----
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  let mongoUri = process.env.MONGO_URI;

  // Use in-memory MongoDB if no URI provided or if it's the placeholder
  if (!mongoUri || mongoUri.includes('cluster0.mongodb.net')) {
    console.log('🔄 Starting in-memory MongoDB (no external DB configured)...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log('✅ In-memory MongoDB started at:', mongoUri);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
    await seed();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Startup error:', err.message);
    process.exit(1);
  }
};

startServer();
