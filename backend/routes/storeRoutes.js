const express = require('express');
const router = express.Router();
const {
  getStores,
  createStore,
} = require('../controllers/storeController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/stores
// @access  Public
router.get('/', getStores);

// @route   POST /api/stores
// @access  Private/Admin
router.post('/', protect, admin, createStore);

module.exports = router;
