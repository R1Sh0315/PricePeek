const express = require('express');
const router = express.Router();
const {
  updatePrice,
  getPriceHistory,
} = require('../controllers/priceController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/prices
// @access  Private/Admin
router.post('/', protect, admin, updatePrice);

// @route   GET /api/prices/:productId/:storeId
// @access  Public
router.get('/:productId/:storeId', getPriceHistory);

module.exports = router;
