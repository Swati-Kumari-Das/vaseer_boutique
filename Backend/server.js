
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("./models/User");


const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
// (Other routes will be added later)
//app.use("/api/products", require("./routes/productRoutes"));
const productRoutes = require('./routes/productRoutes');
app.use("/api/products", productRoutes);  
// app.get("/setup-admin", async (req, res) => {
//     try {
//       const existing = await User.findOne({ email: "admin@example.com" });
//       if (existing) return res.send("Admin already exists");
  
//       const hashed = await bcrypt.hash("admin123", 10);
  
//       const admin = await User.create({
//         name: "Admin",
//         email: "admin@example.com",
//         password: hashed,
//         role: "admin"
//       });
  
//       res.send("Admin user created ✅");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error creating admin");
//     }
//   });
const customizationRoutes = require('./routes/customizationRoutes');
app.use('/api/customizations', customizationRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api", reviewRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
require("./utils/cloudinary"); 

app.use("/api/dashboard", require("./routes/dashboardRoutes"));
const wishlistRoutes = require("./routes/wishlistRoutes");
app.use("/api/wishlist", wishlistRoutes);



app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
