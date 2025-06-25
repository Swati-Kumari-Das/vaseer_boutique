
const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { title, category, description, price, imageUrl, customizable } = req.body;

  try {
    const product = new Product({
      title,
      category,
      description,
      price,
      imageUrl,
      customizable
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Product creation failed", error });
  }
};

exports.getAllProducts = async (req, res) => {
    try {
      const { category, minPrice, maxPrice } = req.query;
  
      let filter = {};
  
      if (category) filter.category = category;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
  
      const products = await Product.find(filter);
      res.status(200).json({ success: true, products });
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
  
  exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  
      res.json({ success: true, product });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  
      res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  