// routes/customizationRoutes.js
const express = require("express");
const router = express.Router();
const { createCustomization, getUserCustomizations, getAllCustomizations, updateCustomizationStatus } = require("../controllers/customizationController");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/create", verifyToken, createCustomization);
router.get("/my-customizations", verifyToken, getUserCustomizations); // ✅ For logged-in buyer
router.get("/admin/all", verifyToken, isAdmin, getAllCustomizations); // 🔐 For admin only
router.put("/:id", verifyToken, isAdmin, updateCustomizationStatus); // Optional: admin updates status

module.exports = router;
