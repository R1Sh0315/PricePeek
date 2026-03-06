const https = require('https');

const urls = [
  'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg',
  'https://images.unsplash.com/photo-1695048065096-749e77b63fcc?w=800&q=80',
  'https://m.media-amazon.com/images/I/81+GIkwqLIL._SX679_.jpg', // iPhone 15 Pro valid?
  'https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg', // macbook air m3
  'https://m.media-amazon.com/images/I/41KsgI2MkpL._SX300_SY300_QL70_FMwebp_.jpg', // xm5?
  'https://m.media-amazon.com/images/I/71dEYJ01YgL._SX679_.jpg', // samsung s24 ultra
  'https://m.media-amazon.com/images/I/71uK-Vv3vYL._SX679_.jpg'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode} - ${url}`);
  }).on('error', (e) => {
    console.error(`ERROR ${url}: ${e.message}`);
  });
});
