
const express = require("express");
const router = express.Router();
const {
  addProductReview,
  getReviewsByProduct,
  addBoutiqueReview,
  getBoutiqueReviews
} = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/auth");

// Product reviews
router.post("/products/:id/reviews", verifyToken, addProductReview);
router.get("/products/:id/reviews", getReviewsByProduct);

// Boutique reviews
router.post("/reviews/boutique", verifyToken, addBoutiqueReview);
router.get("/reviews/boutique", getBoutiqueReviews);

module.exports = router;
