const Store = require('../models/Store');

// @desc    Get all stores
// @route   GET /api/stores
// @access  Public
const getStores = async (req, res, next) => {
  try {
    const stores = await Store.find({});
    res.json(stores);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a store (Admin)
// @route   POST /api/stores
// @access  Private/Admin
const createStore = async (req, res, next) => {
  const { name, logo, websiteUrl, affiliateId } = req.body;

  try {
    const store = await Store.create({
      name,
      logo,
      websiteUrl,
      affiliateId
    });

    res.status(201).json(store);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStores,
  createStore,
};
