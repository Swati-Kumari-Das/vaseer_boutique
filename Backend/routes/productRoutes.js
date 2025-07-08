const express = require("express");
const router = express.Router();
const upload = require("../utils/multer"); // make sure this uses memory storage

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { verifyToken, isAdmin } = require("../middleware/auth");


// ⬇️ Use upload.single("image")
router.post("/add", verifyToken, isAdmin, upload.single("image"), createProduct);
router.put("/:id", verifyToken, isAdmin, upload.single("image"), updateProduct);

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);


module.exports = router;
