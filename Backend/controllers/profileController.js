
// const User = require("../models/User");
// const cloudinary = require("../utils/cloudinary");

// exports.getMyProfile = async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json({ success: true, user });
// };

// exports.updateMyProfile = async (req, res) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     req.body,
//     { new: true }
//   ).select("-password");
//   res.json({ success: true, user: updatedUser });
// };

// exports.deleteMyProfile = async (req, res) => {
//   await User.findByIdAndDelete(req.user.id);
//   res.json({ success: true, message: "Profile deleted" });
// };

// exports.uploadProfilePic = async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { profilePic: result.secure_url },
//       { new: true }
//     );
//     res.json({ success: true, profilePic: user.profilePic });
//   } catch (err) {
//     res.status(500).json({ success: false, msg: "Image upload failed" });
//   }
// };
