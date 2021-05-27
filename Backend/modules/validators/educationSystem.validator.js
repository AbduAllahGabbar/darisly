const Joi = require("@hapi/joi");

module.exports = {
  isValidEducationSystem: Joi.object().keys({
    name: Joi.string().required(),
    nameAr: Joi.string().required(),
  }),
};
