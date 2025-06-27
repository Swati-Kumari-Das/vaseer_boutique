
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User"); // to get user's email
const { orderSchema } = require("../validators/orderValidator"); 
const Product = require("../models/Product"); // keep this at top

exports.placeOrder = async (req, res) => {
  try {
     // ✅ Validate user input
     const { error, value } = orderSchema.validate(req.body);
     if (error) {
       return res.status(400).json({ success: false, message: error.details[0].message });
     }
    const { productId, quantity, shippingAddress, contactPhone,customizationId } = req.body;

    if (!productId || !shippingAddress || !contactPhone) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // You can fetch product to calculate totalAmount if needed
    const Product = require("../models/Product");
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

     
     if (!product) {
       return res.status(404).json({ success: false, message: "Product not found" });
     }
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
    // Notify admin
    const buyer = await require("../models/User").findById(req.user.id);
    const adminEmail = process.env.ADMIN_EMAIL;
    await sendEmail(
      adminEmail,
      "🛍️ New Order Placed",
      `New order placed by ${buyer.name} (${buyer.email}).\nProduct: ${product.title}\nQuantity: ${order.quantity}\nTotal: ₹${order.totalAmount}`
    );

    res.status(201).json({ success: true, order });

  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin: View all orders
// Admin: View all orders with pagination
exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();

    const orders = await Order.find()
      .populate("buyerId", "name email")
      .populate("productId", "title price")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Buyer: View own orders
// Buyer: View own orders with pagination
exports.getMyOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments({ buyerId: req.user.id });

    const orders = await Order.find({ buyerId: req.user.id })
      .populate("productId", "title price")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
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
    ).populate("buyerId", "email name");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // ✅ Send email only when confirmed
    if (status === "confirmed") {
      await sendEmail({
        to: order.buyerId.email,
        subject: "Order Confirmed ✔️",
        text: `Dear ${order.buyerId.name},\n\nYour order has been confirmed!\n\nThank you for shopping with Vaseer Boutique.\n\nRegards,\nVaseer Team`,
      });
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, buyerId: req.user.id });
    if (!order) return res.status(404).json({ success: false, msg: "Order not found or not yours" });

    // Get user email
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, msg: "User not found" });

    await order.deleteOne();

    // Send email
    await sendEmail(
      user.email,
      "Order Cancelled",
      `Your order (ID: ${order._id}) for product ${order.productId} has been cancelled successfully.`
    );

    res.json({ success: true, msg: "Order deleted and email sent" });
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
