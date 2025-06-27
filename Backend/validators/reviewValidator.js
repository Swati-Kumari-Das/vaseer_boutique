
// validators/reviewValidator.js
const Joi = require("joi");

const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(2).max(500).required()
});

module.exports = { reviewSchema };
