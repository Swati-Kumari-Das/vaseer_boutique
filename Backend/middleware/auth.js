
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now we can use req.user.id or req.user.role
    next();
  } catch (err) {
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

