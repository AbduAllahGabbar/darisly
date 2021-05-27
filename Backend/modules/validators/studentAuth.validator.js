const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidRegister: Joi.object().keys({
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
  isValidSocialMediaRegister: Joi.object().keys({
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
    socialMediaToken: Joi.string().required(),
    phoneNumber: Joi.string()
      .min(11)
      .max(11)
      .required()
      .regex(/^01[0,1,2,5]{1}[0-9]{8}/),
    educationSystem: Joi.objectId().required(),
    grade: Joi.objectId().required(),
  }),
  isValidLogin: Joi.object().keys({
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
  }),
  isValidSocialMediaLogin: Joi.object().keys({
    email: Joi.string()
      .required()
      .min(5)
      .max(255)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    socialMediaToken: Joi.string().required(),
  }),
};
