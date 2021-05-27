const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidTrendingCourse: Joi.object().keys({
    course: Joi.objectId().required(),
  }),
};
