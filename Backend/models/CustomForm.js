
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  
  // Specific customization fields
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
  color: { type: String, required: true },
  embroidery: { type: String }, // e.g., "Heavy Zari", "Simple Threadwork", "None"
  extraNotes: { type: String }, // optional textarea

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CustomForm", formSchema);
