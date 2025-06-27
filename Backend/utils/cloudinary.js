
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
// utils/cloudinaryHelpers.js
exports.getCloudinaryPublicId = (imageUrl) => {
  if (!imageUrl) return null;
  const parts = imageUrl.split("/");
  const fileName = parts[parts.length - 1]; // e.g., dress1_abcd1234.jpg
  const publicId = fileName.split(".")[0]; // remove .jpg/.png
  return `products/${publicId}`; // folder + filename without extension
};

exports.deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Extract the public ID from the URL
    const segments = imageUrl.split("/");
    const folder = segments[segments.length - 2]; // e.g., "products", "customizations", "profile_pics"
    const fileWithExt = segments[segments.length - 1]; // e.g., abc123.jpg
    const publicId = `${folder}/${fileWithExt.split(".")[0]}`; // e.g., "products/abc123"

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary deletion failed:", err.message);
  }
};

module.exports = cloudinary;
