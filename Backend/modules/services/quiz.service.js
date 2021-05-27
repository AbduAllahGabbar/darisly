const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const quizModel = require("../models/quiz.model");

getDeliveredQuizByQuizId = (req, res, quizId) => {
  let toFind;
  let query;
  if (req.query.filter === "pass") {
    query = { $gte: 50 };
  } else if (req.query.filter === "fail") {
    query = { $lt: 50 };
  } else query = "";
  if (req.query.filter) {
    toFind = {
      quizId: ObjectId(quizId),
      score: query,
    };
  } else {
    toFind = {
      quizId: ObjectId(quizId),
    };
  }
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  quizModel.defaultSchema
    .find(toFind)
    .populate("studentId", ["firstName", "lastName", "phoneNumber"])
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select({ __v: 0 })
    .sort({ date: -1 })
    .exec((err, data) => res.json(err || data));
};

getStudentDeliveredQuiz = (req, res, quizId, studentId) => {
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  quizModel.defaultSchema
    .findOne({ quizId, studentId })
    .populate("studentId", ["firstName", "lastName", "phoneNumber"])
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select({ __v: 0 })
    .sort({ date: -1 })
    .exec((err, data) => res.json(err || data));
};

checkStudentQuiz = (req, res, quizId, studentId) => {
  quizModel.defaultSchema
    .findOne({ quizId, studentId })
    .select({ __v: 0 })
    .sort({ date: -1 })
    .exec((err, data) => {
      if (err) res.status(500).send(err);
      else {
        if (data && data._id) {
          res.status(200).send("Found");
        } else {
          res.status(404).send("Not Found");
        }
      }
    });
};

module.exports = {
  deleteQuiz: quizModel.genericSchema.delete,
  updateQuiz: quizModel.genericSchema.update,
  findById: quizModel.genericSchema.findById,
  create: quizModel.genericSchema.create,
  findAll: quizModel.genericSchema.findAll,
  getDeliveredQuizByQuizId,
  checkStudentQuiz,
  getStudentDeliveredQuiz,
};
