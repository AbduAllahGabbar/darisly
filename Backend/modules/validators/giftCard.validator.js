const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidGiftCard: Joi.object().keys({
    type: Joi.string().valid(["forAll", "forGroup"]).required(),
    subjectId: Joi.objectId().when("type", {
      is: Joi.valid("forGroup"),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    educationSystemId: Joi.objectId().when("type", {
      is: Joi.valid("forGroup"),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    gradeId: Joi.objectId().when("type", {
      is: Joi.valid("forGroup"),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    teacherId: Joi.objectId().when("type", {
      is: Joi.valid("forGroup"),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    price: Joi.number().required(),
    expiryDate: Joi.date().required(),
  }),
};
