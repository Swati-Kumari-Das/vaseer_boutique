
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
// utils/cloudinaryHelpers.js
// ✅ Define helper functions BEFORE exporting
const getCloudinaryPublicId = (imageUrl) => {
  if (!imageUrl) return null;
  const parts = imageUrl.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  return `products/${publicId}`;
};



const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Extract the public ID from the URL
    const segments = imageUrl.split("/");
    const folder = segments[segments.length - 2]; // e.g., "products", "customizations", "profile_pics"
    const fileWithExt = segments[segments.length - 1]; // e.g., abc123.jpg
    const publicId = `${folder}/${fileWithExt.split(".")[0]}`; // e.g., "products/abc123"

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    console.log("✅ Deleted from Cloudinary:", publicId);
  } catch (err) {
    console.error("Cloudinary deletion failed:", err.message);
  }
};

module.exports = {
  cloudinary,
  getCloudinaryPublicId,
  deleteFromCloudinary
};