const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidCourse: Joi.object().keys({
    subjectId: Joi.string().required(),
    gradeId: Joi.objectId().required(),
    educationSystemId: Joi.objectId().required(),
    price: Joi.number().required(),
    courseIcon: Joi.string().required(),
    teacherId: Joi.objectId(),
    courseIntro: Joi.string().required(),
    isDeleted: Joi.boolean().default(false),
    date: Joi.date().default(Date.now()),
    exclusive: Joi.boolean().default(false),
  }),
};
