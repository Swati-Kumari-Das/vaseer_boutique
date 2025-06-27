
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
// GET /api/products/:id/reviews?page=1&limit=5
exports.getReviewsByProduct = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const reviews = await Review.find({ productId: req.params.id, type: "product" })
      .populate("userId", "name")
      .sort({ createdAt: -1 }) // newest first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({ productId: req.params.id, type: "product" });

    res.json({
      success: true,
      reviews,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalReviews: total,
    });
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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const totalReviews = await Review.countDocuments({ type: "boutique" });

    const reviews = await Review.find({ type: "boutique" })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // latest first
      .populate("userId", "name");

    res.json({
      success: true,
      reviews,
      pagination: {
        total: totalReviews,
        page,
        limit,
        totalPages: Math.ceil(totalReviews / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
