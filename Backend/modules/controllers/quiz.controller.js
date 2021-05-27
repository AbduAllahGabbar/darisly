const Joi = require("@hapi/joi");
const quizValidator = require("../validators/quiz.validator");
const quizService = require("../services/quiz.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    quizService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    // Validation
    Joi.validate(req.body, quizValidator.isValidQuiz, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        quizService.create(req, res);
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
    quizService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateQuiz = (req, res) => {
  try {
    const id = req.params.id;
    quizService.updateQuiz(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteQuiz = (req, res) => {
  try {
    const id = req.params.id;
    quizService.deleteQuiz(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
getDeliveredQuizByQuizId = (req, res) => {
  try {
    const id = req.params.id;
    quizService.getDeliveredQuizByQuizId(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
checkStudentQuiz = (req, res) => {
  try {
    const quizId = req.params.quizId;
    const studentId = req.params.studentId;
    quizService.checkStudentQuiz(req, res, quizId, studentId);
  } catch (error) {
    logger.error(error);
  }
};
getStudentDeliveredQuiz = (req, res) => {
  try {
    const quizId = req.params.quizId;
    const studentId = req.params.studentId;
    quizService.getStudentDeliveredQuiz(req, res, quizId, studentId);
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  create,
  findById,
  updateQuiz,
  deleteQuiz,
  getDeliveredQuizByQuizId,
  checkStudentQuiz,
  getStudentDeliveredQuiz,
};
