const express = require('express');
const router = express.Router();
const {
  createPriceAlert,
  getMyPriceAlerts,
} = require('../controllers/alertController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/alerts
// @access  Private
router.post('/', protect, createPriceAlert);

// @route   GET /api/alerts
// @access  Private
router.get('/', protect, getMyPriceAlerts);

module.exports = router;
