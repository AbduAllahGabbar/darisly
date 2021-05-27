const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidChapter: Joi.object().keys({
    courseId: Joi.objectId().required(),
    name: Joi.string().required(),
    nameAr: Joi.string().required(),
  }),
};
