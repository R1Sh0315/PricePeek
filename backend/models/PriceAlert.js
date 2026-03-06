const mongoose = require('mongoose');

const priceAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  targetPrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
  },
  isTriggered: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const PriceAlert = mongoose.model('PriceAlert', priceAlertSchema);
module.exports = PriceAlert;
