
const Joi = require("joi");

const orderSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).default(1),
  totalAmount: Joi.number().required(),
  shippingAddress: Joi.string().required(),
  contactPhone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("Phone number must be 10 digits")
    .required(),
  paymentMethod: Joi.string().valid("CashOnDelivery").default("CashOnDelivery"),
  orderStatus: Joi.string().valid("pending", "confirmed", "delivered", "cancelled").optional(),
  customizationId: Joi.string().allow(null, "").optional(),
});

module.exports = { orderSchema };
