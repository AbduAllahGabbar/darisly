const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidCommunity: Joi.object().keys({
    courseId: Joi.objectId().required(),
    studentId: Joi.objectId().required(),
    question: Joi.string(),
    attachments: Joi.array(),
    answers: Joi.array().items(
      Joi.object({
        type: Joi.string().valid(["Text", "Attachment", "Link", "Voice"]),
        value: Joi.string(),
      })
    ),
  }),
  isValidAnswer: Joi.object().keys({
    type: Joi.string()
      .required()
      .valid(["Text", "Attachment", "Link", "Voice"]),
    value: Joi.string().required(),
  }),
  isValidMultipleAnswers: Joi.object().keys({
    answers: Joi.array()
      .min(1)
      .required()
      .items(
        Joi.object({
          type: Joi.string()
            .valid(["Text", "Attachment", "Link", "Voice"])
            .required(),
          value: Joi.string().required(),
        })
      ),
    toDelete: Joi.array(),
  }),
  isValidSearch: Joi.object().keys({
    courseId: Joi.objectId().required(),
    question: Joi.string().required(),
  }),
};
