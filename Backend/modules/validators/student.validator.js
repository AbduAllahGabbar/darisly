const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidStudent: Joi.object().keys({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .required()
      .min(5)
      .max(255)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    password: Joi.string()
      .required()
      .regex(/^.{6,}$/),
    confirmPassword: Joi.string()
      .required()
      .regex(/^.{6,}$/),
    phoneNumber: Joi.string()
      .min(11)
      .max(11)
      .required()
      .regex(/^01[0,1,2,5]{1}[0-9]{8}/),
    educationSystem: Joi.objectId().required(),
    grade: Joi.objectId().required(),
  }),
  isValidUpdateStudentPassword: Joi.object().keys({
    oldPassword: Joi.string()
      .required()
      .regex(/^.{6,}$/),
    newPassword: Joi.string()
      .required()
      .regex(/^.{6,}$/),
  }),
  isValidUpdateStudent: Joi.object().keys({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    phoneNumber: Joi.string()
      .min(11)
      .max(11)
      .regex(/^01[0,1,2,5]{1}[0-9]{8}/),
    educationSystem: Joi.objectId(),
    grade: Joi.objectId(),
  }),
};
