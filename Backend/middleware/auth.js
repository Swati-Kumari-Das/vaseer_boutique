
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Auth header:", authHeader); // 👈 Debug log
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    onsole.log("❌ No token or malformed header");
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔑 Extracted token:", token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);
    req.user = decoded; // now we can use req.user.id or req.user.role
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(401).json({ msg: "Token invalid or expired" });
  }
};

// ✅ Add this to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
  next();
};

// ✅ Export both middlewares
module.exports = {
  verifyToken,
  isAdmin
};

