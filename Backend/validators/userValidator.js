
// validators/userValidator.js
const Joi = require("joi");

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
  address: Joi.string().max(200).optional(),
  profilePicture: Joi.string().uri().optional(), // Cloudinary URL
});

module.exports = { updateUserSchema };
