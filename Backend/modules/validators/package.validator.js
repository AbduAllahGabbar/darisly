const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidPackage: Joi.object().keys({
    subjectId: Joi.objectId().required(),
    teacherId: Joi.objectId().required(),
    educationSystemId: Joi.objectId().required(),
    gradeId: Joi.objectId().required(),
    packageLessons: Joi.array().min(1).required(),
    oldPrice: Joi.number().required(),
    newPrice: Joi.number().required(),
    expiryDate: Joi.date().required(),
  }),
};
