

const User = require("../models/User");
const Order = require("../models/Order");
const Customization = require("../models/Customization");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "buyer" });

    const totalOrders = await Order.countDocuments();
    const totalCustomizations = await Customization.countDocuments();

    const customizationStatusCount = await Customization.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const totalRevenueData = await Order.aggregate([
      { $match: { orderStatus: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalOrders,
        totalCustomizations,
        customizationStatusCount,
        totalRevenue
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.getMonthlySales = async (req, res) => {
    try {
      const monthlyData = await Order.aggregate([
        { $match: { orderStatus: "delivered" } },
        {
          $group: {
            _id: { year: { $year: "$placedAt" }, month: { $month: "$placedAt" } },
            totalSales: { $sum: "$totalAmount" },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]);
  
      res.json({ success: true, monthlyData });
    } catch (err) {
      res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  