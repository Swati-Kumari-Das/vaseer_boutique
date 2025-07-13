// controllers/cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add or update item in cart
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1, size } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, size }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, size });
      }
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.json({ success: true, cart: [] });

    res.json({ success: true, cart: cart.items });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Update quantity
exports.updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, size, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, msg: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );
    if (!item) return res.status(404).json({ success: false, msg: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.json({ success: true, msg: "Quantity updated", cart });
  } catch (err) {
    console.error("Update cart item error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, size } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, msg: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => !(i.product.toString() === productId && i.size === size)
    );
    await cart.save();

    res.json({ success: true, msg: "Item removed", cart });
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
