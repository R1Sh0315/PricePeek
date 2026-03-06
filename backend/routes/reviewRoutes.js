const express = require('express');
const router = express.Router();
const {
  createProductReview,
  getProductReviews,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/reviews
// @access  Private
router.post('/', protect, createProductReview);

// @route   GET /api/reviews/:productId
// @access  Public
router.get('/:productId', getProductReviews);

module.exports = router;
