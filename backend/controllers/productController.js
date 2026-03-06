const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Price = require('../models/Price');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Get best price and best store for each product
  const productsWithPrices = await Promise.all(
    products.map(async (product) => {
      const prices = await Price.find({ product: product._id }).populate('store');
      let bestPrice = null;
      let bestStore = null;
      let bestPriceUrl = null;
      let bestStoreId = null;
      
      if (prices.length > 0) {
        const sorted = prices.sort((a, b) => a.price - b.price);
        bestPrice = sorted[0].price;
        bestStore = sorted[0].store.name;
        bestPriceUrl = sorted[0].productUrl;
        bestStoreId = sorted[0].store._id;
      }
      
      return { ...product._doc, bestPrice, bestStore, bestPriceUrl, bestStoreId };
    })
  );

  res.json({ products: productsWithPrices, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get product details by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const prices = await Price.find({ product: product._id }).populate('store');

    res.json({
      ...product._doc,
      stores: prices.map(price => ({
        store: price.store,
        price: price.price,
        currency: price.currency,
        productUrl: price.productUrl,
        isAvailable: price.isAvailable,
        history: price.history,
      })),
      bestPrice: prices.length > 0 ? Math.min(...prices.map(p => p.price)) : null
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product (Admin)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, images, brand } = req.body;

  const product = new Product({
    name,
    description,
    category,
    images: images || [],
    brand,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, images, brand } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.images = images || product.images;
    product.brand = brand || product.brand;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    // Also delete associated prices
    await Price.deleteMany({ product: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
