const mongoose = require('mongoose');

const clickTrackingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ipAddress: String,
  userAgent: String,
  isPurchased: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

const ClickTracking = mongoose.model('ClickTracking', clickTrackingSchema);
module.exports = ClickTracking;
