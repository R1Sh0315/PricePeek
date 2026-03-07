const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAdminStats,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/users/stats
// @access  Private/Admin
router.get('/stats', protect, admin, getAdminStats);

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
