const Address = require("../models/Address");

// ➕ Add Address
// ➕ Add Address
exports.addAddress = async (req, res) => {
  try {
    const { fullName, mobile, pinCode, addressLine, city, state, isDefault } = req.body;

    // ❌ Prevent duplicate (based on key fields)
    const existing = await Address.findOne({
      userId: req.user.id,
      fullName,
      mobile,
      pinCode,
      addressLine,
      city,
      state
    });

    if (existing) {
      return res.status(400).json({ success: false, msg: "Address already exists" });
    }

    // ✅ Reset default
    if (isDefault) {
      await Address.updateMany({ userId: req.user.id }, { isDefault: false });
    }

    const newAddress = new Address({
      userId: req.user.id,
      fullName,
      mobile,
      pinCode,
      addressLine,
      city,
      state,
      isDefault
    });

    await newAddress.save();
    res.status(201).json({ success: true, address: newAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Failed to add address" });
  }
};


// 📦 Get all user addresses
exports.getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.json({ success: true, addresses });
  } catch {
    res.status(500).json({ success: false, msg: "Failed to get addresses" });
  }
};

// 🗑️ Delete address
exports.deleteAddress = async (req, res) => {
  try {
    await Address.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, msg: "Failed to delete address" });
  }
};

// ✏️ Edit address
exports.updateAddress = async (req, res) => {
  try {
    const { fullName, mobile, pinCode, addressLine, city, state, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ userId: req.user.id }, { isDefault: false });
    }

    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { fullName, mobile, pinCode, addressLine, city, state, isDefault },
      { new: true }
    );

    res.json({ success: true, address: updated });
  } catch {
    res.status(500).json({ success: false, msg: "Failed to update address" });
  }
};
