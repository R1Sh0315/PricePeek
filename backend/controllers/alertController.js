const asyncHandler = require('express-async-handler');
const PriceAlert = require('../models/PriceAlert');
const Price = require('../models/Price');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');

// @desc    Check and Send Alerts Function
// Called when a price is updated
const checkAndSendAlerts = async (productId, currentPrice) => {
  try {
    const alertsToTrigger = await PriceAlert.find({
      product: productId,
      targetPrice: { $gte: currentPrice },
      isTriggered: false
    }).populate('product', 'name');

    if (alertsToTrigger.length > 0) {
      console.log(`Triggering ${alertsToTrigger.length} alerts for Product ${productId}`);
      
      for (const alert of alertsToTrigger) {
        const message = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
            <h2 style="color: #2563eb;">Price Drop Alert! 📉</h2>
            <p>Good news! Your price target for <strong>${alert.product.name}</strong> has been met.</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #4b5563; font-size: 14px;">Current Price:</p>
                <p style="margin: 5px 0 0 0; color: #111827; font-size: 24px; font-weight: bold;">₹${currentPrice.toLocaleString('en-IN')}</p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 10px 0;" />
                <p style="margin: 0; color: #4b5563; font-size: 14px;">Your Target:</p>
                <p style="margin: 5px 0 0 0; color: #059669; font-size: 18px; font-weight: bold;">₹${alert.targetPrice.toLocaleString('en-IN')}</p>
            </div>
            <p>Grab the deal before the price goes up again!</p>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/product/${productId}" 
               style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold;">
               View Deal on PricePeek
            </a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">This is an automated alert from PricePeek India. You can manage your alerts in your dashboard.</p>
          </div>
        `;

        await sendEmail({
          email: alert.email,
          subject: `Price Drop: ${alert.product.name} is now ₹${currentPrice.toLocaleString('en-IN')}`,
          message
        });

        // Mark alert as triggered
        alert.isTriggered = true;
        await alert.save();
      }
    }
  } catch (error) {
    console.error('Error in checkAndSendAlerts:', error);
  }
};

// @desc    Create new price alert
// @route   POST /api/alerts
// @access  Private
const createPriceAlert = asyncHandler(async (req, res) => {
  const { productId, targetPrice } = req.body;

  const productAlreadyAlerted = await PriceAlert.findOne({
    user: req.user._id,
    product: productId,
    isTriggered: false,
  });

  if (productAlreadyAlerted) {
    res.status(400);
    throw new Error('You already have an active price alert for this product');
  }

  const alert = await PriceAlert.create({
    user: req.user._id,
    product: productId,
    targetPrice: Number(targetPrice),
    email: req.user.email,
  });

  res.status(201).json(alert);
});

// @desc    Get current user price alerts
// @route   GET /api/alerts
// @access  Private
const getMyPriceAlerts = asyncHandler(async (req, res) => {
  const alerts = await PriceAlert.find({ user: req.user._id }).populate('product', 'name images');
  res.json(alerts);
});

module.exports = {
  createPriceAlert,
  getMyPriceAlerts,
  checkAndSendAlerts
};
