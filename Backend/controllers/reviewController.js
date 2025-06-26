
const Review = require("../models/Review");
const Order = require("../models/Order");

// POST /api/products/:id/reviews
exports.addProductReview = async (req, res) => {
  const { comment, rating } = req.body;
  const productId = req.params.id;

  try {
    const hasPurchased = await Order.findOne({
      buyerId: req.user.id,
      productId,
      orderStatus: "delivered"
    });

    if (!hasPurchased) {
      return res.status(403).json({ msg: "Only buyers who ordered this product can review it." });
    }

    const review = new Review({
      userId: req.user.id,
      productId,
      comment,
      rating,
      type: "product"
    });

    await review.save();
    res.status(201).json({ success: true, review });

  } catch (err) {
    console.error("Error adding product review:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// GET /api/products/:id/reviews
exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id, type: "product" })
      .populate("userId", "name");
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// POST /api/reviews/boutique
exports.addBoutiqueReview = async (req, res) => {
    const { comment, rating } = req.body;
  
    try {
      // ✅ Check if user has received any order
      const hasDeliveredOrder = await Order.findOne({
        buyerId: req.user.id,
        orderStatus: "delivered"
      });
  
      if (!hasDeliveredOrder) {
        return res.status(403).json({ msg: "Only buyers with delivered orders can review the boutique." });
      }
  
      const review = new Review({
        userId: req.user.id,
        comment,
        rating,
        type: "boutique"
      });
  
      await review.save();
      res.status(201).json({ success: true, review });
  
    } catch (err) {
      console.error("Error adding boutique review:", err);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  

// GET /api/reviews/boutique
exports.getBoutiqueReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ type: "boutique" })
      .populate("userId", "name");
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
