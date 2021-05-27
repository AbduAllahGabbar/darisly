const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidPreview: Joi.object().keys({
    course: Joi.objectId().required(),
    videoUrl: Joi.string().required(),
  }),
};
