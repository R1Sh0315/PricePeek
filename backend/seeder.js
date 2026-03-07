const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Store = require('./models/Store');
const Price = require('./models/Price');
const Review = require('./models/Review');
const connectDB = require('./config/db');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Store.deleteMany();
    await Price.deleteMany();
    await Review.deleteMany();

    // 1. Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@pricepeek.in',
      password: 'password123',
      role: 'admin'
    });

    console.log('Admin User Created');

    // 2. Create Indian Stores
    const amazon = await Store.create({
      name: 'Amazon India',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      websiteUrl: 'https://www.amazon.in',
      affiliateId: 'pricepeekindia-21'
    });

    const flipkart = await Store.create({
      name: 'Flipkart',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flipkart_logo.png',
      websiteUrl: 'https://www.flipkart.com',
      affiliateId: 'pp-flipkart-01'
    });

    const reliance = await Store.create({
      name: 'Reliance Digital',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Reliance_Digital_logo.png',
      websiteUrl: 'https://www.reliancedigital.in',
      affiliateId: 'pp-reliance-99'
    });

    const croma = await Store.create({
      name: 'Croma',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Croma_Logo.png',
      websiteUrl: 'https://www.croma.com',
      affiliateId: 'croma-pp'
    });

    console.log('Indian Stores Created');

    // 3. Create Products for Indian Market
    const iphone = await Product.create({
      name: 'iPhone 15 Pro (128GB, Natural Titanium)',
      description: 'The latest iPhone with Titanium design, A17 Pro chip, and advanced Pro camera system.',
      category: 'Electronics',
      brand: 'Apple',
      images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800']
    });

    const macbook = await Product.create({
      name: 'Apple MacBook Air M3 Chip (13.6-inch)',
      description: 'Strikingly thin and fast. Supercharged by the M3 chip with a 13.6-inch Liquid Retina display.',
      category: 'Electronics',
      brand: 'Apple',
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800']
    });

    const sony_xm5 = await Product.create({
      name: 'Sony WH-1000XM5 Wireless Headphones',
      description: 'Industry-leading noise cancellation, exceptional sound quality, and crystal-clear calls.',
      category: 'Electronics',
      brand: 'Sony',
      images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800']
    });

    const nokia_g42 = await Product.create({
      name: 'Nokia G42 5G (Snapdragon 480+, 6GB RAM, 128GB)',
      description: 'The first Nokia smartphone designed with QuickFix repairability. 5G connected, with triple rear cameras.',
      category: 'Electronics',
      brand: 'Nokia',
      images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800']
    });

    const samsung_s24 = await Product.create({
      name: 'Samsung Galaxy S24 Ultra (Titanium Gray, 12GB, 256GB)',
      description: 'The most intelligent Galaxy camera. Circle to Search, Live Translate, and Note Assist powered by AI.',
      category: 'Electronics',
      brand: 'Samsung',
      images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800']
    });

    console.log('Indian Products Created');

    // 4. Create Prices with History for INR
    // iPhone 15 Pro Prices
    await Price.create([
      {
        product: iphone._id,
        store: amazon._id,
        price: 127990,
        currency: 'INR',
        productUrl: 'https://www.amazon.in/iphone-15-pro',
        history: [
            { price: 134900, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
            { price: 132000, date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) },
            { price: 129990, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
            { price: 127990, date: new Date() }
        ]
      },
      {
        product: iphone._id,
        store: flipkart._id,
        price: 128900,
        currency: 'INR',
        productUrl: 'https://www.flipkart.com/iphone-15-pro',
        history: [
            { price: 134900, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
            { price: 130000, date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
            { price: 128900, date: new Date() }
        ]
      },
      {
          product: iphone._id,
          store: croma._id,
          price: 126990,
          currency: 'INR',
          productUrl: 'https://www.croma.com/iphone-15-pro',
          history: [
              { price: 134900, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
              { price: 126990, date: new Date() }
          ],
          isAvailable: true
      }
    ]);

    // MacBook Air M3
    await Price.create([
      {
        product: macbook._id,
        store: amazon._id,
        price: 114900,
        currency: 'INR',
        productUrl: 'https://www.amazon.in/macbook-air-m3',
        history: [
            { price: 114900, date: new Date() }
        ]
      },
      {
        product: macbook._id,
        store: reliance._id,
        price: 112900,
        currency: 'INR',
        productUrl: 'https://www.reliancedigital.in/macbook-air-m3',
        history: [
            { price: 114900, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
            { price: 112900, date: new Date() }
        ]
      }
    ]);

    // Nokia G42
    await Price.create([
      {
        product: nokia_g42._id,
        store: amazon._id,
        price: 12499,
        currency: 'INR',
        productUrl: 'https://www.amazon.in/nokia-g42-5g',
        history: [{ price: 12499, date: new Date() }]
      },
      {
        product: nokia_g42._id,
        store: flipkart._id,
        price: 12990,
        currency: 'INR',
        productUrl: 'https://www.flipkart.com/nokia-g42-5g',
        history: [{ price: 12990, date: new Date() }]
      }
    ]);

    // Samsung S24 Ultra
    await Price.create([
      {
        product: samsung_s24._id,
        store: amazon._id,
        price: 129999,
        currency: 'INR',
        productUrl: 'https://www.amazon.in/samsung-galaxy-s24-ultra',
        history: [{ price: 129999, date: new Date() }]
      },
      {
        product: samsung_s24._id,
        store: flipkart._id,
        price: 128999,
        currency: 'INR',
        productUrl: 'https://www.flipkart.com/samsung-galaxy-s24-ultra',
        history: [{ price: 128999, date: new Date() }]
      }
    ]);

    console.log('Prices with History Created');

    // 5. Create Sample Reviews
    await Review.create([
        {
          product: iphone._id,
          user: admin._id,
          rating: 5,
          comment: 'Best phone I ever bought. The natural titanium color is so premium and solid build quality!'
        },
        {
            product: sony_xm5._id,
            user: admin._id,
            rating: 4,
            comment: 'Noise cancellation is top drawer, but the hinges feel a bit more delicate than xm4.'
        }
    ]);

    console.log('Reviews Created');

    console.log('India Market Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
