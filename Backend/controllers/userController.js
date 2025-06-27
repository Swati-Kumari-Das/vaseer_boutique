
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const { updateUserSchema } = require("../validators/userValidator");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


// UPDATE profile
exports.updateProfile = async (req, res) => {
    try {
      // ✅ Validate input
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
      const updates = req.body;
      // Optional: Handle profile picture if using file upload
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updates.profilePicture = result.secure_url;
    }

      const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
      
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

      res.json({ success: true, user });
    } catch (err) {
      console.error("Update profile error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  // DELETE profile
  exports.deleteProfile = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.json({ success: true, message: "Profile deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  // UPLOAD profile picture to Cloudinary
  exports.uploadProfilePicture = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
      }
  
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ success: false, message: "Invalid image format" });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pics",
      });
  
      const user = await User.findByIdAndUpdate(req.user.id, {
        profilePicture: result.secure_url,
      }, { new: true });
  
      res.json({ success: true, profilePicture: user.profilePicture });
    } catch (err) {
      res.status(500).json({ success: false, message: "Image upload failed" });
    }
  };
