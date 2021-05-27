const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidCode: Joi.object().keys({
    courseId: Joi.objectId().required(),
    subjectId: Joi.objectId().required(),
    teacherId: Joi.objectId().required(),
    educationSystemId: Joi.objectId().required(),
    gradeId: Joi.objectId().required(),
    codeLessons: Joi.array().min(1).required(),
    numberOfCodes: Joi.number().required(),
  }),
  isValidCheckCode: Joi.object().keys({
    studentId: Joi.objectId().required(),
    code: Joi.string().required(),
  }),
};
