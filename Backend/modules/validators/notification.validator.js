const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidNotification: Joi.object().keys({
    userId: Joi.objectId().required(),
    notification: Joi.string().required(),
  }),
};
