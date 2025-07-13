
const express = require("express");
const router = express.Router();
const {
  addProductReview,
  getReviewsByProduct,
  addBoutiqueReview,
  getBoutiqueReviews,
  deleteReviewByAdmin,
  checkCanReview
} = require("../controllers/reviewController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Product reviews
router.post("/products/:id/reviews", verifyToken, addProductReview);
router.get("/reviews/product/:productId", getReviewsByProduct);
router.get("/reviews/can-review/:productId", verifyToken, checkCanReview);

// Boutique reviews
router.post("/reviews/boutique", verifyToken, addBoutiqueReview);
router.get("/reviews/boutique", getBoutiqueReviews);

// 🛡️ Admin can delete any review
router.delete("/:id", verifyToken, isAdmin, deleteReviewByAdmin);


module.exports = router;
