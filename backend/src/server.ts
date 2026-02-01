import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Grocery E-commerce API',
    status: 'running',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});