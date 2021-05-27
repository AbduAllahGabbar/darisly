const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = {
  isValidLesson: Joi.object().keys({
    chapterId: Joi.objectId().required(),
    name: Joi.string().required(),
    nameAr: Joi.string().required(),
    price: Joi.number().required(),
    liveSession: Joi.boolean().default(false),
    validFor: Joi.number().when("liveSession", {
      is: Joi.valid(false),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    startDate: Joi.date().when("liveSession", {
      is: Joi.valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    startTime: Joi.string().when("liveSession", {
      is: Joi.valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    meetingId: Joi.string().when("liveSession", {
      is: Joi.valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    meetingPassword: Joi.string().when("liveSession", {
      is: Joi.valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    items: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        nameAr: Joi.string(),
        type: Joi.string().valid(["Video", "Attachment"]),
        value: Joi.string(),
        videoLength: Joi.number(),
      })
    ),
    tasks: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        nameAr: Joi.string(),
        deadline: Joi.date(),
        requirements: Joi.array().items(
          Joi.object({
            type: Joi.string().valid(["Attachment", "Text", "Link", "Voice"]),
            value: Joi.string(),
          })
        ),
      })
    ),
    quizzes: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        nameAr: Joi.string(),
        durationTimeQuiz: Joi.boolean(),
        duration: Joi.number(),
        displayCorrectAnswer: Joi.boolean(),
        showAnswersPerQuestion: Joi.boolean(),
        questions: Joi.array().items(
          Joi.object({
            question: Joi.object({
              text: Joi.string(),
              image: Joi.string(),
            }),
            answers: Joi.array().items(
              Joi.object({
                text: Joi.string(),
                image: Joi.string(),
                correct: Joi.boolean(),
              })
            ),
            justification: Joi.object({
              text: Joi.string(),
              image: Joi.string(),
              link: Joi.string(),
            }),
          })
        ),
      })
    ),
  }),
  isValidContent: Joi.object().keys({
    name: Joi.string().required(),
    nameAr: Joi.string().required(),
    type: Joi.string().valid(["Attachment", "Video"]).required(),
    value: Joi.string().required(),
    videoLength: Joi.number(),
  }),
  isValidTask: Joi.object().keys({
    name: Joi.string().required(),
    nameAr: Joi.string().required(),
    deadline: Joi.date().required(),
    requirements: Joi.array()
      .min(1)
      .required()
      .items(
        Joi.object({
          type: Joi.string()
            .valid(["Attachment", "Text", "Link", "Voice"])
            .required(),
          value: Joi.string().required(),
        })
      ),
  }),
  isValidQuiz: Joi.object().keys({
    name: Joi.string().required(),
    nameAr: Joi.string().required(),
    durationTimeQuiz: Joi.boolean().required(),
    duration: Joi.number().when("durationTimeQuiz", {
      is: Joi.valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    displayCorrectAnswer: Joi.boolean().required(),
    showAnswersPerQuestion: Joi.boolean().required(),
    questions: Joi.array()
      .min(1)
      .required()
      .items(
        Joi.object({
          question: Joi.object({
            text: Joi.string(),
            image: Joi.string(),
          }),
          answers: Joi.array()
            .min(1)
            .required()
            .items(
              Joi.object({
                text: Joi.string(),
                image: Joi.string(),
                correct: Joi.boolean(),
              })
            ),
          justification: Joi.object({
            text: Joi.string(),
            image: Joi.string(),
            link: Joi.string(),
          }),
        })
      ),
  }),
};
