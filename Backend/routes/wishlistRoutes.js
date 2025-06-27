
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require("../controllers/wishlistController");

router.post("/add/:productId", verifyToken, addToWishlist);
router.delete("/remove/:productId", verifyToken, removeFromWishlist);
router.get("/", verifyToken, getWishlist);

module.exports = router;
