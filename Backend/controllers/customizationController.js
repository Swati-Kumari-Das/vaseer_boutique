// controllers/customizationController.js
const Customization = require("../models/Customization");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const streamifier = require("streamifier");
const { customizationSchema,statusSchema} = require("../validators/customizationValidation");
const { cloudinary,deleteFromCloudinary } = require("../utils/cloudinary");


exports.createCustomization = async (req, res) => {
    try {
       // ✅ Validate input
       console.log("📦 Incoming customization req.body:", req.body);
console.log("🖼️ Uploaded file:", req.file);

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
    await sendEmail({
      to: adminEmail,
      subject: "🎨 New Customization Request",
      text: `New customization request from ${user.name} (${user.email}).\n\nProduct ID: ${productId}\nOccasion: ${occasion || "N/A"}`
    });
    
    await sendEmail({
      to: user.email,
      subject: "🧵 Customization Request Received",
      text: `Dear ${user.name},\n\nThank you for your customization request!\n\nOur team will review the details and contact you shortly.\n\nRegards,\nVaseer Boutique`
    });
    
  
      res.status(201).json({ success: true, customization });
    } catch (error) {
      console.error("Error creating customization:", error);
      console.error("Full error object:", error); // <-- add this for full trace
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
  
  // exports.getAllCustomizations = async (req, res) => {
  //   try {
  //     const customizations = await Customization.find().populate("productId buyerId");
  //     res.json({ success: true, customizations });
  //   } catch (err) {
  //     res.status(500).json({ success: false, message: "Server error" });
  //   }
  // };
  
  exports.getAllCustomizations = async (req, res) => {
    try {
      const { search, status, fromDate, toDate } = req.query;
      const match = {};
  
      if (status) match.status = status;
  
      if (fromDate || toDate) {
        match.createdAt = {};
        if (fromDate) match.createdAt.$gte = new Date(fromDate);
        if (toDate) match.createdAt.$lte = new Date(toDate);
      }
  
      const pipeline = [
        { $match: match },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productId"
          }
        },
        {
          $unwind: {
            path: "$productId",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "buyerId",
            foreignField: "_id",
            as: "buyerId"
          }
        },
        {
          $unwind: {
            path: "$buyerId",
            preserveNullAndEmptyArrays: true
          }
        }
      ];
  
      if (search) {
        const regex = new RegExp(search, "i");
        pipeline.push({
          $match: {
            $or: [
              { "productId.title": regex },
              { "productId.category": regex },
              { "buyerId.name": regex },
              { "buyerId.email": regex },
              { color: regex },
              { size: regex },
              { additionalNotes: regex },
              { designChangeNotes: regex },
              { occasion: regex }
            ]
          }
        });
      }
  
      pipeline.push({ $sort: { createdAt: -1 } });
  
      const customizations = await Customization.aggregate(pipeline);
      res.json({ success: true, customizations });
  
    } catch (err) {
      console.error("Error fetching customizations:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  
  // exports.updateCustomizationStatus = async (req, res) => {
  //   try {
  //     const { error } = statusSchema.validate(req.body);
  //     if (error) {
  //       return res.status(400).json({ success: false, message: error.details[0].message });
  //     }
  
  //     const { status, note } = req.body; // <-- ✅ Extract rejection note
  
  //     const customization = await Customization.findById(req.params.id);
  //     if (!customization) {
  //       return res.status(404).json({ success: false, message: "Customization not found" });
  //     }
  
  //     customization.status = status;
  
  //     // ✅ Save rejection note only if status is Rejected
  //     if (status === "Rejected") {
  //       customization.rejectionNote = note || "";
  //     }
  
  //     await customization.save();
  
  //     // ✅ Auto-place order if approved
  //     if (status === "Accepted") {
  //       const product = await Product.findById(customization.productId);
  //       if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  
  //       const order = new Order({
  //         buyerId: customization.buyerId,
  //         productId: customization.productId,
  //         quantity: 1,
  //         totalAmount: product.price,
  //         shippingAddress: "To be collected later or confirmed by user",
  //         contactPhone: customization.phone,
  //         customizationId: customization._id,
  //       });
  
  //       await order.save();
  //     }
  
  //     res.json({ success: true, message: "Customization updated", customization });
  
  //   } catch (error) {
  //     console.error("Update customization error:", error);
  //     res.status(500).json({ success: false, message: "Server error" });
  //   }
  // };
  

  exports.updateCustomizationStatus = async (req, res) => {
    try {
      const { error } = statusSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      const { status, note } = req.body;
      const customization = await Customization.findById(req.params.id);
  
      if (!customization) {
        return res.status(404).json({ success: false, message: "Customization not found" });
      }
  
      customization.status = status;
      if (status === "Rejected") {
        customization.rejectionNote = note || "";
      } else {
        customization.rejectionNote = ""; // clear note on status change
      }
  
      await customization.save();
  
      // Auto-create order if accepted
      if (status === "Accepted") {
        const product = await Product.findById(customization.productId);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  
        const order = new Order({
          buyerId: customization.buyerId,
          productId: customization.productId,
          quantity: 1,
          totalAmount: product.price,
          shippingAddress: "To be collected later or confirmed by user",
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
  
      await sendEmail({
        to: user.email,
        subject: "Customization Request Cancelled",
        text: `Dear ${user.name},\n\nYour customization request (ID: ${customization._id}) has been cancelled. Unfortunately, it cannot be customized.\n\nRegards,\nVaseer Boutique`
      });
      
  
      res.json({ success: true, msg: "Customization deleted and email sent" });
    } catch (err) {
      console.error("Error cancelling customization:", err);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  