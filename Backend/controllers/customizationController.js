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
