
const express = require("express");
const router = express.Router();
const { getDashboardStats, getMonthlySales  } = require("../controllers/dashboardController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Admin-only dashboard route
router.get("/stats", verifyToken, isAdmin, getDashboardStats);
router.get("/monthly-sales", verifyToken, isAdmin, getMonthlySales);
module.exports = router;
