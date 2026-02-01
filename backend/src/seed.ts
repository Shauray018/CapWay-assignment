import dotenv from 'dotenv';
import connectDB from './config/database';
import Product from './models/product';


dotenv.config();

const sampleProducts = [
  {
    name: 'Fresh Oranges',
    category: 'Orange',
    pricePerUnit: '$3.99/lb',
    salePrice: 3.99,
    originalPrice: 4.99,
    stockLeft: 150,
    image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=500',
  },
  {
    name: 'Organic Strawberries',
    category: 'Strawberry',
    pricePerUnit: '$5.99/lb',
    salePrice: 5.99,
    originalPrice: 7.49,
    stockLeft: 85,
    image: 'https://images.unsplash.com/photo-1543528176-61b239494933?w=500',
  },
  {
    name: 'Fresh Limes',
    category: 'Lime',
    pricePerUnit: '$0.50/each',
    salePrice: 0.5,
    originalPrice: 0.75,
    stockLeft: 200,
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=500',
  },
  {
    name: 'Gala Apples',
    category: 'Apple',
    pricePerUnit: '$2.99/lb',
    salePrice: 2.99,
    originalPrice: 3.49,
    stockLeft: 120,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
  },
  {
    name: 'Organic Bananas',
    category: 'Banana',
    pricePerUnit: '$1.99/lb',
    salePrice: 1.99,
    originalPrice: 2.49,
    stockLeft: 300,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500',
  },
  {
    name: 'Fresh Carrots',
    category: 'Carrot',
    pricePerUnit: '$1.49/lb',
    salePrice: 1.49,
    originalPrice: 1.99,
    stockLeft: 180,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500',
  },
  {
    name: 'Vine Tomatoes',
    category: 'Tomato',
    pricePerUnit: '$3.49/lb',
    salePrice: 3.49,
    originalPrice: 4.29,
    stockLeft: 95,
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=500',
  },
  {
    name: 'Russet Potatoes',
    category: 'Potato',
    pricePerUnit: '$0.99/lb',
    salePrice: 0.99,
    originalPrice: 1.29,
    stockLeft: 250,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500',
  },
  {
    name: 'Yellow Onions',
    category: 'Onion',
    pricePerUnit: '$1.29/lb',
    salePrice: 1.29,
    originalPrice: 1.79,
    stockLeft: 220,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500',
  },
  {
    name: 'Fresh Broccoli',
    category: 'Broccoli',
    pricePerUnit: '$2.99/lb',
    salePrice: 2.99,
    originalPrice: 3.49,
    stockLeft: 75,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🌱 Seeding database...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${products.length} products`);

    console.log('\n📦 Products added:');
    products.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - $${product.salePrice}`);
    });

    console.log('\n🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();