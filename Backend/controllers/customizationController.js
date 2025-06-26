// controllers/customizationController.js
const Customization = require("../models/Customization");
const Order = require("../models/Order");
const Product = require("../models/Product");

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
      const customization = await Customization.findById(req.params.id);
  
      if (!customization) {
        return res.status(404).json({ success: false, message: "Customization not found" });
      }
  
      customization.status = status;
      await customization.save();
  
      // ✅ Auto-place order if approved
      if (status === "approved") {
        const product = await Product.findById(customization.productId);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  
        const order = new Order({
          buyerId: customization.buyerId,
          productId: customization.productId,
          quantity: 1,
          totalAmount: product.price,
          shippingAddress: "To be collected later or confirmed by user", // placeholder
          contactPhone: customization.phone,
          customizationId: customization._id,
        });
  
        await order.save();
      }
  
      res.json({ success: true, message: "Customization updated", customization });
  
    } catch (error) {
      console.error("Update customization error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };