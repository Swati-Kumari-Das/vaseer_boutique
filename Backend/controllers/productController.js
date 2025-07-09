
const Product = require("../models/Product");
const { productSchema } = require("../validators/productValidator");
const streamifier = require("streamifier");
const {
  cloudinary,
  getCloudinaryPublicId,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

// Upload image buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  const { title, category, description, price, customizable,fabricType } = req.body;

  try {
     // Validate form fields (excluding image)
     const { error, value } = productSchema.validate(req.body);
     if (error) {
       return res.status(400).json({ success: false, message: error.details[0].message });
     }
 
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const product = new Product({
      title,
      category,
      description,
      price,
      imageUrl,
      customizable,
      fabricType,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Product creation failed" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      search
    } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      const regex = new RegExp(search, "i"); // case-insensitive search
      filter.$or = [
        { title: regex },
        { category: regex }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });
      res.json({ success: true, product });
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  
 // UPDATE PRODUCT
 exports.updateProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, {
      allowUnknown: true,
      presence: "optional",
    });
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const updates = req.body;

    // ✅ Get existing product first
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // ✅ If a new image is uploaded, remove old one
    if (req.file) {
      const oldPublicId = getCloudinaryPublicId(product.imageUrl);
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }
      const result = await uploadToCloudinary(req.file.buffer);
      updates.imageUrl = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ success: false, message: "Product update failed" });
  }
};

  
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });

      // ✅ Delete image from Cloudinary
       await deleteFromCloudinary(product.imageUrl);
      // Then delete the product from DB
       await product.deleteOne();
      res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  