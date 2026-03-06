const ClickTracking = require('../models/ClickTracking');
const Price = require('../models/Price');

// @desc    Track a click and return affiliate URL
// @route   POST /api/clicks
// @access  Public (tracked by IP/User Agent if not logged in)
const trackClick = async (req, res, next) => {
  const { productId, storeId, price } = req.body;

  try {
    // Save click to database
    const click = await ClickTracking.create({
      user: req.user ? req.user._id : null,
      product: productId,
      store: storeId,
      price: price,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Find the price entry to get the store URL and affiliate ID
    const priceEntry = await Price.findOne({ product: productId, store: storeId }).populate('store');

    if (!priceEntry) {
      res.status(404);
      throw new Error('Price entry not found');
    }

    // Construct affiliate URL (example logic)
    // In a real app, you'd append the affiliate ID to the product URL
    let affiliateUrl = priceEntry.productUrl;
    if (priceEntry.store.affiliateId) {
      const separator = affiliateUrl.includes('?') ? '&' : '?';
      affiliateUrl += `${separator}tag=${priceEntry.store.affiliateId}`;
    }

    res.json({ affiliateUrl });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  trackClick,
};
