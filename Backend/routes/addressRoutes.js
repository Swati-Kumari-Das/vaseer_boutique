const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  addAddress,
  getMyAddresses,
  deleteAddress,
  updateAddress
} = require("../controllers/addressController");

router.post("/", verifyToken, addAddress);
router.get("/", verifyToken, getMyAddresses);
router.delete("/:id", verifyToken, deleteAddress);
router.put("/:id", verifyToken, updateAddress);

module.exports = router;
