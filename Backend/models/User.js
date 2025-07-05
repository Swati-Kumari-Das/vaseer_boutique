// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  address: String,
 // profilePicture: String, // Cloudinary URL
  role: {
    type: String,
    enum: ["buyer", "admin"],
    default: "buyer"
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
  
});

module.exports = mongoose.model("User", userSchema);
