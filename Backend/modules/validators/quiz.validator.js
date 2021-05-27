const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidQuiz: Joi.object().keys({
    quizId: Joi.objectId().required(),
    studentId: Joi.objectId().required(),
    answers: Joi.array()
      .min(1)
      .required()
      .items(
        Joi.object({
          questionId: Joi.objectId().required(),
          answerId: Joi.objectId().required(),
        })
      ),
    score: Joi.number(),
  }),
};
