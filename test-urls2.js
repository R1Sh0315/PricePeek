const https = require('https');
const urls = [
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800', // sony
  'https://fdn2.gsmarena.com/vv/pics/nokia/nokia-g42-1.jpg',
  'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-1.jpg',
  'https://fdn2.gsmarena.com/vv/pics/nokia/nokia-g42-5g-1.jpg'
];
urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode} - ${url}`);
  }).on('error', (e) => {
    console.error(`ERROR ${url}: ${e.message}`);
  });
});
