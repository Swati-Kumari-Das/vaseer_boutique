// controllers/customizationController.js
const Customization = require("../models/Customization");

exports.createCustomization = async (req, res) => {
    try {
      const { productId, size, color, additionalNotes, contactEmail, designChangeNotes, phone } = req.body;
  
      const customization = new Customization({
        productId,
        buyerId: req.user.id,
        size,
        color,
        additionalNotes,
        contactEmail,
        designChangeNotes,
        phone,
      });
  
      await customization.save();
  
      res.status(201).json({ success: true, customization });
    } catch (error) {
      console.error("Error creating customization:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  

// module.exports = {
//   createCustomization
// };

exports.getUserCustomizations = async (req, res) => {
    try {
      const customizations = await Customization.find({ buyerId: req.user.id }).populate("productId");
      res.json({ success: true, customizations });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  exports.getAllCustomizations = async (req, res) => {
    try {
      const customizations = await Customization.find().populate("productId buyerId");
      res.json({ success: true, customizations });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  exports.updateCustomizationStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const updated = await Customization.findByIdAndUpdate(req.params.id, { status }, { new: true });
  
      if (!updated) {
        return res.status(404).json({ success: false, message: "Customization not found" });
      }
  
      res.json({ success: true, updated });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };