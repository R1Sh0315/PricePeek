const https = require('https');
const urls = [
  'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg',
  'https://fdn2.gsmarena.com/vv/pics/nokia/nokia-g42-5g-1.jpg',
  'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-1.jpg',
  'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg', // another variation of amazon image?
  'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' // maybe fakestore?
];

Promise.all(urls.map(url => {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      console.log(`${res.statusCode} - ${url}`);
      resolve();
    }).on('error', (e) => {
      console.error(`ERROR ${url}: ${e.message}`);
      resolve();
    });
  });
}));
