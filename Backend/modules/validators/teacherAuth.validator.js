const Joi = require("@hapi/joi");

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
    gender: Joi.string().valid(["male", "female"]).required(),
    specialization: Joi.string().required(),
    nationality: Joi.string().required(),
    frontIdCard: Joi.string().required(),
    backIdCard: Joi.string().required(),
    certificates: Joi.array().required(),
    personalImage: Joi.string().required(),
    approved: Joi.boolean().default(false),
    date: Joi.date().default(Date.now()),
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
    gender: Joi.string().valid(["male", "female"]).required(),
    specialization: Joi.string().required(),
    nationality: Joi.string().required(),
    frontIdCard: Joi.string().required(),
    backIdCard: Joi.string().required(),
    certificates: Joi.array().required(),
    personalImage: Joi.string().required(),
    approved: Joi.boolean().default(false),
    date: Joi.date().default(Date.now()),
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
