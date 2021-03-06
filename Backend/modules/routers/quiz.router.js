const express = require("express");
const quizRouter = express.Router();
const quizController = require("../controllers/quiz.controller");

quizRouter.get("/", quizController.getAllData);
quizRouter.post("/", quizController.create);
quizRouter.get("/deliveredQuiz/:id", quizController.getDeliveredQuizByQuizId);
quizRouter.get(
  "/checkStudentQuiz/:quizId/:studentId",
  quizController.checkStudentQuiz
);
quizRouter.get(
  "/getStudentDeliveredQuiz/:quizId/:studentId",
  quizController.getStudentDeliveredQuiz
);
quizRouter.get("/:id", quizController.findById);
quizRouter.put("/:id", quizController.updateQuiz);
quizRouter.delete("/:id", quizController.deleteQuiz);

module.exports = quizRouter;
