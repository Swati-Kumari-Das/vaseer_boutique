
const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
//const upload = require("../utils/multer"); 

const {
    getUserProfile,
    updateProfile,
    deleteProfile,
    
  } = require("../controllers/userController");
  
  router.get("/profile", verifyToken, getUserProfile);
  router.put("/profile", verifyToken, updateProfile);
  router.delete("/profile", verifyToken, deleteProfile);
//  router.post("/profile/picture", verifyToken, upload.single("image"), uploadProfilePicture);
  
module.exports = router;
