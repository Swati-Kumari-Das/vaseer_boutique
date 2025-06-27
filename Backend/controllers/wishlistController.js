
const User = require("../models/User");

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  const productId = req.params.productId;

  try {
    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ success: false, msg: "Product already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json({ success: true, msg: "Product added to wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const productId = req.params.productId;

  try {
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter(p => p.toString() !== productId);
    await user.save();

    res.json({ success: true, msg: "Product removed from wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
