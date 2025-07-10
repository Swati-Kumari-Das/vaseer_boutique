
// /validation/customizationValidation.js
const Joi = require("joi");

const customizationSchema = Joi.object({
  productId: Joi.string().required(),
  size: Joi.string().allow("").optional(),
  color: Joi.string().allow("").optional(),
  additionalNotes: Joi.string().allow("").optional(),
  contactEmail: Joi.string().email().required(),
  designChangeNotes: Joi.string().allow("").optional(),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).required().messages({
    "string.pattern.base": "Phone must be a valid 10-digit Indian number starting with 6-9",
  }),
  occasion: Joi.string()
    .valid("Wedding", "Party", "Casual", "Festive", "Other")
    .optional()
});

const statusSchema = Joi.object({
  status: Joi.string().valid("Pending", "Accepted", "Rejected").required(),
  note: Joi.string().allow("").optional(), // ✅ allow note (only for rejected)
});
module.exports = { customizationSchema , statusSchema};
