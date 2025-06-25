
const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts } = require("../controllers/productController");

const verifyToken = require("../middleware/auth");

//Admin only route to add product
router.post("/add", verifyToken, async (req, res,next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: "Access denied:Admins Only" });
  }
  next();

  // Continue to add product
},createProduct);

// Public route to get all products
router.get("/all", getAllProducts);

module.exports = router;