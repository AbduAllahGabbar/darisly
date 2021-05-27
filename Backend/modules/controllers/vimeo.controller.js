const vimeoService = require("../services/vimeo.service");
const logger = require("../../helpers/logging");
const studentController = require("./student.controller");

findById = (req, res) => {
  try {
    const id = req.params.id;
    vimeoService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
findByIdAndUpdateStudent = (req, res) => {
  try {
    const id = req.params.id;
    vimeoService.findById(req, res, id);
    if (req.body.firstTime) {
      if (!req.body.studentId) {
        return res.status(403).send("studentId is required");
      }
      if (!req.body.lessonId) {
        return res.status(403).send("LessonId is required");
      }
      if (!req.body.validFor) {
        return res.status(403).send("validFor is required");
      }
      studentController.updateStudentLessonPurchase(req, res);
    }
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  findById,
  findByIdAndUpdateStudent,
};
