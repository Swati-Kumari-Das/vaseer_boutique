
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  uploadProfilePic
} = require("../controllers/profileController");
const upload = require("../middleware/multer"); // for Cloudinary

router.get("/", verifyToken, getMyProfile);
router.put("/", verifyToken, updateMyProfile);
router.delete("/", verifyToken, deleteMyProfile);
router.post("/upload", verifyToken, upload.single("image"), uploadProfilePic);

module.exports = router;
