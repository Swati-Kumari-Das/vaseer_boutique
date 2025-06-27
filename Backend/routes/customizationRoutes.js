// routes/customizationRoutes.js
const express = require("express");
const router = express.Router();
const { createCustomization, getUserCustomizations, getAllCustomizations, updateCustomizationStatus,deleteCustomization } = require("../controllers/customizationController");
const { verifyToken, isAdmin } = require("../middleware/auth");
const upload = require("../utils/multer"); 

router.post("/create", verifyToken,  upload.single("image"),createCustomization);
router.get("/my-customizations", verifyToken, getUserCustomizations); // ✅ For logged-in buyer
router.get("/admin/all", verifyToken, isAdmin, getAllCustomizations); // 🔐 For admin only
router.put("/:id", verifyToken, isAdmin, updateCustomizationStatus); // Optional: admin updates status
// DELETE /api/customizations/:id (only creator can delete)
router.delete("/:id", verifyToken, deleteCustomization);

module.exports = router;
