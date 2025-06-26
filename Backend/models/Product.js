const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  customizable: { type: Boolean, default: false },
  fabricType: {
    type: String,
    required: true,
    enum: ["Cotton", "Silk", "Georgette", "Linen", "Chiffon", "Velvet", "Net", "Rayon", "Other"], // Customize as needed
  },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
