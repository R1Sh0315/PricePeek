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

    const watch_se = await Product.create({
      name: 'Apple Watch SE (2nd Gen) [GPS 44mm]',
      description: 'Stay connected. Stay active. Stay healthy. Apple Watch SE is the most affordable way to get all the essentials.',
      category: 'Electronics',
      brand: 'Apple',
      images: ['https://images.unsplash.com/photo-1544117518-30df57809ca7?auto=format&fit=crop&q=80&w=800']
    });

    const watch_series9 = await Product.create({
      name: 'Apple Watch Series 9 [GPS 45mm]',
      description: 'Smarter, Brighter, Mightier. Magic at your fingertips with the new double tap gesture.',
      category: 'Electronics',
      brand: 'Apple',
      images: ['https://images.unsplash.com/photo-1434494878577-86c23bddca6a?auto=format&fit=crop&q=80&w=800']
    });

    const watch_ultra2 = await Product.create({
      name: 'Apple Watch Ultra 2 [GPS + Cellular 49mm]',
      description: 'The most rugged and capable Apple Watch. Designed for endurance, exploration, and adventure.',
      category: 'Electronics',
      brand: 'Apple',
      images: ['https://images.unsplash.com/photo-1695718721034-7224f8d29871?auto=format&fit=crop&q=80&w=800']
    });

    // Casio Collection from API Request
    const casio_a158 = await Product.create({
      name: "Casio Vintage A-158WA-1Q Digital Grey Dial Unisex Watch Silver Metal Strap (D011)",
      brand: "Casio",
      category: "Watch",
      description: "Casio Vintage A-158WA-1Q Digital Grey Dial Unisex Watch Silver Metal Strap (D011)",
      images: ["https://m.media-amazon.com/images/I/61ybeKQto8L._AC_UL960_QL65_.jpg"]
    });

    const casio_f91w = await Product.create({
      name: "Casio Youth Series Digital Black Dial Unisex Watch - F-91W-1Q(D002)",
      brand: "Casio",
      category: "Watch",
      description: "Casio Youth Series Digital Black Dial Unisex Watch - F-91W-1Q(D002)",
      images: ["https://m.media-amazon.com/images/I/51oNy5CTCOL._AC_UL960_QL65_.jpg"]
    });

    const casio_ws1800_2 = await Product.create({
      name: "Casio Youth WS-1800-2AVDF Digital Clear Watch Men (A2533)",
      brand: "Casio",
      category: "Watch",
      description: "Casio Youth WS-1800-2AVDF Digital Clear Watch Men (A2533)",
      images: ["https://m.media-amazon.com/images/I/61FQJS45j4L._AC_UL960_QL65_.jpg"]
    });

    const casio_a168wa = await Product.create({
      name: "Casio Unisex Vintage A168WA-1WDF Black Digital Dial Silver Stainless Steel Band D131",
      brand: "Casio",
      category: "Watch",
      description: "Casio Unisex Vintage A168WA-1WDF Black Digital Dial Silver Stainless Steel Band D131",
      images: ["https://m.media-amazon.com/images/I/511gHFVWqpL._AC_UL960_QL65_.jpg"]
    });

    const casio_a159w = await Product.create({
      name: "Casio Unisex Vintage A159W-N1DF Black Digital Dial Silver Stainless Steel Band D339",
      brand: "Casio",
      category: "Watch",
      description: "Casio Unisex Vintage A159W-N1DF Black Digital Dial Silver Stainless Steel Band D339",
      images: ["https://m.media-amazon.com/images/I/61BlYD7ZvyL._AC_UL960_QL65_.jpg"]
    });

    const casio_mtp1302_green = await Product.create({
      name: "Casio Enticer Men Analog Green Dial Men MTP-1302PD-3AVEF (A2262)",
      brand: "Casio",
      category: "Watch",
      description: "Casio Enticer Men Analog Green Dial Men MTP-1302PD-3AVEF (A2262)",
      images: ["https://m.media-amazon.com/images/I/61XeQ6jAVqL._AC_UL960_QL65_.jpg"]
    });

    const casio_ws1800_3 = await Product.create({
      name: "Casio Youth WS-1800-3AVDF Digital Clear Watch Men (A2534)",
      brand: "Casio",
      category: "Watch",
      description: "Casio Youth WS-1800-3AVDF Digital Clear Watch Men (A2534)",
      images: ["https://m.media-amazon.com/images/I/61dgn7rRPJL._AC_UL960_QL65_.jpg"]
    });

    const casio_mtp1374 = await Product.create({
      name: "Casio Enticer Analog Black Dial Men's Watch - MTP-1374D-1AVDF (A832)",
      brand: "Casio",
      category: "Watch",
      description: "Casio Enticer Analog Black Dial Men's Watch - MTP-1374D-1AVDF (A832)",
      images: ["https://m.media-amazon.com/images/I/61FKVerMRWL._AC_UL960_QL65_.jpg"]
    });

    const casio_ltpv007 = await Product.create({
      name: "Casio Enticer Ladies Analog White Dial Women LTP-V007L-7B2UDF (A2288)",
      brand: "Casio",
      category: "Watch",
      description: "Casio Enticer Ladies Analog White Dial Women LTP-V007L-7B2UDF (A2288)",
      images: ["https://m.media-amazon.com/images/I/51zk1uEOnHL._AC_UL960_QL65_.jpg"]
    });

    const casio_w218hm = await Product.create({
      name: "Casio Youth W-218HM-7AVDF Digital Black Dial Men (D374)",
      brand: "Casio",
      category: "Watch",
      description: "Casio Youth W-218HM-7AVDF Digital Black Dial Men (D374)",
      images: ["https://m.media-amazon.com/images/I/61XIcIjnApL._AC_UL960_QL65_.jpg"]
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

    // Apple Watch SE Prices
    await Price.create([
      {
        product: watch_se._id,
        store: amazon._id,
        price: 27900,
        currency: 'INR',
        productUrl: 'https://www.amazon.in/apple-watch-se',
        history: [{ price: 29900, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) }, { price: 27900, date: new Date() }]
      },
      {
        product: watch_se._id,
        store: flipkart._id,
        price: 28499,
        currency: 'INR',
        productUrl: 'https://www.flipkart.com/apple-watch-se',
        history: [{ price: 28499, date: new Date() }]
      }
    ]);

    // Apple Watch Series 9 Prices
    await Price.create([
      {
        product: watch_series9._id,
        store: amazon._id,
        price: 39900,
        currency: 'INR',
        productUrl: 'https://www.amazon.in/apple-watch-series-9',
        history: [{ price: 41900, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }, { price: 39900, date: new Date() }]
      },
      {
        product: watch_series9._id,
        store: croma._id,
        price: 39499,
        currency: 'INR',
        productUrl: 'https://www.croma.com/apple-watch-series-9',
        history: [{ price: 39499, date: new Date() }]
      }
    ]);

    // Apple Watch Ultra 2 Prices
    await Price.create([
      {
        product: watch_ultra2._id,
        store: amazon._id,
        price: 89900,
        currency: 'INR',
        productUrl: 'https://www.amazon.in/apple-watch-ultra-2',
        history: [{ price: 89900, date: new Date() }]
      },
      {
        product: watch_ultra2._id,
        store: reliance._id,
        price: 88900,
        currency: 'INR',
        productUrl: 'https://www.reliancedigital.in/apple-watch-ultra-2',
        history: [{ price: 88900, date: new Date() }]
      }
    ]);

    // Casio Prices (from the API list)
    await Price.create([
      { product: casio_a158._id, store: amazon._id, price: 1894, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B000GAYQJ0', history: [{ price: 1894, date: new Date() }] },
      { product: casio_f91w._id, store: amazon._id, price: 1295, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B00HFPIIOI', history: [{ price: 1295, date: new Date() }] },
      { product: casio_ws1800_2._id, store: amazon._id, price: 3595, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B0GNRNWVVS', history: [{ price: 3595, date: new Date() }] },
      { product: casio_a168wa._id, store: amazon._id, price: 2479, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B00JAK1PMI', history: [{ price: 2479, date: new Date() }] },
      { product: casio_a159w._id, store: amazon._id, price: 1994, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B07NWF5CN6', history: [{ price: 1994, date: new Date() }] },
      { product: casio_mtp1302_green._id, store: amazon._id, price: 3994, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B0BRP4LVN2', history: [{ price: 3994, date: new Date() }] },
      { product: casio_ws1800_3._id, store: amazon._id, price: 3595, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B0GNSGLT45', history: [{ price: 3595, date: new Date() }] },
      { product: casio_mtp1374._id, store: amazon._id, price: 5995, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B00GRRIZK2', history: [{ price: 5995, date: new Date() }] },
      { product: casio_ltpv007._id, store: amazon._id, price: 2495, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B08DHYZ1RH', history: [{ price: 2495, date: new Date() }] },
      { product: casio_w218hm._id, store: amazon._id, price: 1494, currency: 'INR', productUrl: 'https://www.amazon.in/dp/B0DLBGVNK1', history: [{ price: 1494, date: new Date() }] }
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
