const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/add", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);

router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);


module.exports = router;
