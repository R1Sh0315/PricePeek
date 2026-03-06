const fs = require('fs');
const https = require('https');
const path = require('path');

const imagesDir = path.join(__dirname, 'frontend/public/images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const images = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/IPhone_15_Pro_Max_Natural_Titanium.svg/800px-IPhone_15_Pro_Max_Natural_Titanium.svg.png', name: 'iphone-15.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Macbook_Air_M2_Silver.png/800px-Macbook_Air_M2_Silver.png', name: 'macbook.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Sony_WH-1000XM5_Platinum_Silver.jpg', name: 'sony-xm5.jpg' },
  { url: 'https://fdn2.gsmarena.com/vv/pics/nokia/nokia-g42-5g-1.jpg', name: 'nokia-g42.jpg' },
  { url: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-sm-s928-1.jpg', name: 'samsung-s24.jpg' }
];

images.forEach(img => {
    https.get(img.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 200) {
            const file = fs.createWriteStream(path.join(imagesDir, img.name));
            res.pipe(file);
        } else {
            console.log(`Failed for ${img.name}: ${res.statusCode}`);
        }
    });
});
