const Joi = require("@hapi/joi");

module.exports = {
  isValidPromoCode: Joi.object().keys({
    promoCode: Joi.string().alphanum().min(3).max(30).required(),
    discount: Joi.string().valid(["byAmount", "byPercentage"]).required(),
    value: Joi.string().required(),
    expiryDate: Joi.date().required(),
  }),
};
