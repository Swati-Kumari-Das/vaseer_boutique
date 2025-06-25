
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  customizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customization",
    default: null, // Only present for customized orders
  },
  quantity: {
    type: Number,
    default: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["CashOnDelivery"],
    default: "CashOnDelivery",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending",
  },
 
  placedAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Order", orderSchema);
