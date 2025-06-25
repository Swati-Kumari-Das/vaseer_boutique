
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  comment: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
