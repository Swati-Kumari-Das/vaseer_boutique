
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

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
      const updates = req.body;
      const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
      res.json({ success: true, user });
    } catch (err) {
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
