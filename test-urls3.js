const https = require('https');
const urls = [
  'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg',
  'https://fdn2.gsmarena.com/vv/pics/nokia/nokia-g42-5g-1.jpg',
  'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-1.jpg',
  'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6534/6534606_sd.jpg', // macbook
  'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505727_sd.jpg' // sony xm5
];
urls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    console.log(`${res.statusCode} - ${url}`);
  }).on('error', (e) => {
    console.error(`ERROR ${url}: ${e.message}`);
  });
});
