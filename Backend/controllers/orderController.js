
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { productId, quantity, shippingAddress, contactPhone,customizationId } = req.body;

    if (!productId || !shippingAddress || !contactPhone) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // You can fetch product to calculate totalAmount if needed
    const Product = require("../models/Product");
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const totalAmount = product.price * (quantity || 1);

    const order = new Order({
      buyerId: req.user.id, // from token
      productId,
      quantity: quantity || 1,
      shippingAddress,
      contactPhone,
      totalAmount,
      customizationId: customizationId || null
    });

    await order.save();
    res.status(201).json({ success: true, order });

  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin: View all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("buyerId", "name email").populate("productId", "title price");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Buyer: View own orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id }).populate("productId", "title price");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
