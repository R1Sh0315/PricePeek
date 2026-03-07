const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (product) {
      const alreadyReviewed = await Review.findOne({
        user: req.user._id,
        product: productId,
      });

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }

      const review = await Review.create({
        user: req.user._id,
        product: productId,
        rating: Number(rating),
        comment,
      });

      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = async (req, res, next) => {
  try {
    if (req.params.productId.startsWith('amazon-')) {
       return res.json([]);
    }
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProductReview,
  getProductReviews,
};
