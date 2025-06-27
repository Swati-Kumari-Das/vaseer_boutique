
const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus,deleteOrder } = require("../controllers/orderController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Buyer places order
router.post("/place", verifyToken, placeOrder);

// Buyer sees their orders
router.get("/my", verifyToken, getMyOrders);

// Admin: view all orders
router.get("/all", verifyToken, isAdmin, getAllOrders);

// Admin: update order status
router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);
// DELETE /api/orders/:id (only buyer who placed it can delete)
router.delete("/:id", verifyToken, deleteOrder);


module.exports = router;
