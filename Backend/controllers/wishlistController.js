
const User = require("../models/User");
// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');


// Add to wishlist
exports.addToWishlist = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // First time wishlist creation
      wishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
    } else {
      // Check if already added
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ success: false, msg: "Product already in wishlist" });
      }

      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.json({ success: true, msg: "Product added to wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ success: false, msg: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.json({ success: true, msg: "Product removed from wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');

    if (!wishlist) {
      return res.json({ success: true, wishlist: [] }); // empty wishlist
    }

    res.json({ success: true, wishlist: wishlist.products });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

