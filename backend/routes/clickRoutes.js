const express = require('express');
const router = express.Router();
const { trackClick } = require('../controllers/clickController');
const { protect } = require('../middleware/authMiddleware');

const { isLoggedIn } = require('../middleware/authMiddleware');

// @route   POST /api/clicks
// @access  Public (tracked by user id if available)
router.post('/', isLoggedIn, trackClick);

module.exports = router;
