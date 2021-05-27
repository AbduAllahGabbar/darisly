const Joi = require("@hapi/joi");
const lessonValidator = require("../validators/lesson.validator");
const lessonService = require("../services/lesson.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    lessonService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    // Validation
    Joi.validate(req.body, lessonValidator.isValidLesson, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        lessonService.create(req, res);
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

findById = (req, res) => {
  try {
    const id = req.params.id;
    lessonService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateLesson = (req, res) => {
  try {
    const id = req.params.id;
    lessonService.updateLesson(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteLesson = (req, res) => {
  try {
    const id = req.params.id;
    lessonService.deleteLesson(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
addContentIntoLesson = (req, res) => {
  try {
    Joi.validate(req.body, lessonValidator.isValidContent, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const id = req.params.id;
        lessonService.addContentIntoLesson(req, res, id);
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};
addTaskIntoLesson = (req, res) => {
  try {
    Joi.validate(req.body, lessonValidator.isValidTask, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const id = req.params.id;
        lessonService.addTaskIntoLesson(req, res, id);
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};
updateContent = (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const contentId = req.params.contentId;
    lessonService.updateContent(req, res, lessonId, contentId);
  } catch (error) {
    logger.error(error);
  }
};
deleteContent = (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const contentId = req.params.contentId;
    lessonService.deleteContent(req, res, lessonId, contentId);
  } catch (error) {
    logger.error(error);
  }
};
updateTask = (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const taskId = req.params.taskId;
    lessonService.updateTask(req, res, lessonId, taskId);
  } catch (error) {
    logger.error(error);
  }
};
addQuizIntoLesson = (req, res) => {
  try {
    Joi.validate(req.body, lessonValidator.isValidQuiz, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const id = req.params.id;
        lessonService.addQuizIntoLesson(req, res, id);
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};
updateQuiz = (req, res) => {
  try {
    Joi.validate(req.body.quiz, lessonValidator.isValidQuiz, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const lessonId = req.params.lessonId;
        const quizId = req.params.quizId;
        lessonService.updateQuiz(req, res, lessonId, quizId);
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};
deleteQuiz = (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const quizId = req.params.quizId;
    lessonService.deleteQuiz(req, res, lessonId, quizId);
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  create,
  findById,
  updateLesson,
  deleteLesson,
  addContentIntoLesson,
  addTaskIntoLesson,
  updateContent,
  deleteContent,
  updateTask,
  addQuizIntoLesson,
  updateQuiz,
  deleteQuiz,
};
