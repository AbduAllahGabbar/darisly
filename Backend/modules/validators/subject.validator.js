const Joi = require("@hapi/joi");

module.exports = {
  isValidSubject: Joi.object().keys({
    name: Joi.string().required(),
    nameAr: Joi.string().required(),
    educationSystems: Joi.array().min(1).required(),
  }),
};
