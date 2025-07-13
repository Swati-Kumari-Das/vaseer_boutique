// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.put("/update", verifyToken, updateCartItem);
router.delete("/remove", verifyToken, removeFromCart);

module.exports = router;
