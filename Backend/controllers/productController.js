
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