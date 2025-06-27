const Joi = require("joi");

const fabricTypes = [
  "Cotton", "Silk", "Georgette", "Linen", "Chiffon",
  "Velvet", "Net", "Rayon", "Other"
];

exports.productSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  category: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(10).max(1000).optional(),
  price: Joi.number().min(0).required(),
  imageUrl: Joi.string().uri().optional(), // If you're sending from Cloudinary later
  customizable: Joi.boolean().required(),
  fabricType: Joi.string().valid(...fabricTypes).required(),
});
