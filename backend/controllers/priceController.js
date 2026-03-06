const Price = require('../models/Price');
const { checkAndSendAlerts } = require('./alertController');

// @desc    Add or update product price for a store
// @route   POST /api/prices
// @access  Private/Admin
const updatePrice = async (req, res, next) => {
  const { productId, storeId, price, productUrl, isAvailable } = req.body;

  try {
    let priceEntry = await Price.findOne({ product: productId, store: storeId });

    if (priceEntry) {
      // Add current price to history before updating
      priceEntry.history.push({
        price: priceEntry.price,
        date: priceEntry.updatedAt
      });

      priceEntry.price = price;
      priceEntry.productUrl = productUrl || priceEntry.productUrl;
      priceEntry.isAvailable = isAvailable !== undefined ? isAvailable : priceEntry.isAvailable;

      await priceEntry.save();
      
      // Trigger alerts check
      await checkAndSendAlerts(productId, price);
      
      res.json(priceEntry);
    } else {
      priceEntry = await Price.create({
        product: productId,
        store: storeId,
        price,
        productUrl,
        isAvailable
      });

      // Trigger alerts check
      await checkAndSendAlerts(productId, price);

      res.status(201).json(priceEntry);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get price history for a product/store
// @route   GET /api/prices/:productId/:storeId
// @access  Public
const getPriceHistory = async (req, res, next) => {
  try {
    const priceEntry = await Price.findOne({ 
      product: req.params.productId, 
      store: req.params.storeId 
    });

    if (priceEntry) {
      res.json(priceEntry.history);
    } else {
      res.status(404);
      throw new Error('Price entry not found');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updatePrice,
  getPriceHistory,
};
