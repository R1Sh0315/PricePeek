const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/users
// @access  Public
router.post('/', registerUser);

// @route   POST /api/users/login
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

module.exports = router;
