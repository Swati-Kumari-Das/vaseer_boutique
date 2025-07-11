
const mongoose = require("mongoose");

const customizationSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    size: String,
    color: String,
    additionalNotes: String,        // existing field
    designChangeNotes: String,      // 🆕 added field
    contactEmail: {
      type: String,
      required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    rejectionNote: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    occasion: {
      type: String,
      enum: ["Wedding", "Party", "Casual", "Festive", "Other"], // optional enum
      default: "Other"
    },
    imageUrl: {
      type: String,
      default: null,
    }
    
      
  });
  module.exports = mongoose.model("Customization", customizationSchema);
