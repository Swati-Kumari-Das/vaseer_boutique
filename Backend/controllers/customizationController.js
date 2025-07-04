// controllers/customizationController.js
const Customization = require("../models/Customization");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const { customizationSchema,statusSchema} = require("../validators/customizationValidation");
const { deleteFromCloudinary } = require("../utils/cloudinary");


exports.createCustomization = async (req, res) => {
    try {
       // ✅ Validate input
    const { error } = customizationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

      const { productId, size, color, additionalNotes, contactEmail, designChangeNotes, phone ,occasion} = req.body;
      
      let imageUrl = null;

    if (req.file) {
      // ✅ Upload to Cloudinary
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "customizations" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      imageUrl = result.secure_url;
    }
      const customization = new Customization({
        productId,
        buyerId: req.user.id,
        size,
        color,
        additionalNotes,
        contactEmail,
        designChangeNotes,
        phone,
        occasion,
        imageUrl 
      });
  
      await customization.save();
       // Notify admin
    const user = await require("../models/User").findById(req.user.id);
    const adminEmail = process.env.ADMIN_EMAIL;
    await sendEmail(
      adminEmail,
      "🎨 New Customization Request",
      `New customization request from ${user.name} (${user.email}).\nCategory: ${req.body.category}\nOccasion: ${req.body.occasion || "N/A"}`
    );
  
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
        // ✅ Validate the input
    const { error } = statusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
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

  exports.deleteCustomization = async (req, res) => {
    try {
      const customization = await Customization.findOne({
        _id: req.params.id,
        userId: req.user.id
      });
  
      if (!customization) {
        return res.status(404).json({ success: false, msg: "Customization not found or not yours" });
      }
      // ✅ Delete image if present
     if (customization.imageUrl) {
       await deleteFromCloudinary(customization.imageUrl);
      } 

      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ success: false, msg: "User not found" });
  
      await customization.deleteOne();
  
      // Send cancellation email
      await sendEmail(
        user.email,
        "Customization Request Cancelled",
        `Your customization request (ID: ${customization._id}) has been cancelled successfully.`
      );
  
      res.json({ success: true, msg: "Customization deleted and email sent" });
    } catch (err) {
      console.error("Error cancelling customization:", err);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  