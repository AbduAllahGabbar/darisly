const Joi = require("@hapi/joi");

module.exports = {
  isValidTeacher: Joi.object().keys({
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
    approved: Joi.boolean().default(true),
    date: Joi.date().default(Date.now()),
    bio: Joi.string(),
  }),
  isValidUpdateTeacher: Joi.object().keys({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    phoneNumber: Joi.string()
      .min(11)
      .max(11)
      .regex(/^01[0,1,2,5]{1}[0-9]{8}/),
    bio: Joi.string(),
  }),
  isValidUpdateTeacherProfilePicture: Joi.object().keys({
    attachment: Joi.string().required(),
    toDelete: Joi.string().required(),
  }),
  isValidUpdateTeacherPassword: Joi.object().keys({
    oldPassword: Joi.string()
      .required()
      .regex(/^.{6,}$/),
    newPassword: Joi.string()
      .required()
      .regex(/^.{6,}$/),
  }),
  isValidUpdateTeacherStatus: Joi.object().keys({
    approved: Joi.boolean().required(),
  }),
};
