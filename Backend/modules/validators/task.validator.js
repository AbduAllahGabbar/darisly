const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidTask: Joi.object().keys({
    taskId: Joi.objectId().required(),
    studentId: Joi.objectId().required(),
    deliveredTask: Joi.string().required(),
    score: Joi.number(),
  }),
  isValidReplaceTaskAttachment: Joi.object().keys({
    toDelete: Joi.string().required(),
    deliveredTask: Joi.string().required(),
  }),
};
