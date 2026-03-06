const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  affiliateId: {
    type: String,
  }
}, {
  timestamps: true
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
