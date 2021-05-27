const Joi = require("@hapi/joi");

module.exports = {
  isValidRegister: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .required()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/
      ), // password between 8 to 25 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
  }),
  isValidLogin: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .required()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/
      ), // password between 8 to 25 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
  }),
};
