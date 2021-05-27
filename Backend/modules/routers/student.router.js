const express = require("express");
const studentRouter = express.Router();
const Joi = require("@hapi/joi");
const logger = require("../../helpers/logging");
const studentController = require("../controllers/student.controller");
const studentValidator = require("../validators/student.validator");

studentRouter.get("/", studentController.getAllData);

studentRouter.route("/").post((req, res) => {
  // Validation
  Joi.validate(req.body, studentValidator.isValidStudent, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      studentController.createStudent(req, res);
    } catch (error) {
      logger.error(error);
    }
  });
});
studentRouter.get(
  "/course/:studentId/:courseId",
  studentController.findStudentCourseByCourseId
);
studentRouter.get("/purchaseCourses/:id", studentController.findStudentCourses);
studentRouter.get("/purchaseLessons/:id", studentController.findStudentLessons);
studentRouter.post("/purchase/:id", studentController.addPurchaseIntoStudent);
// studentRouter.put(
//   "/purchase/:id",
//   studentController.updateStudentLessonPurchase
// );
studentRouter.get("/favorite/:id", studentController.findStudentFavorites);
studentRouter.put("/favorite/:id", studentController.addFavoriteIntoStudent);
studentRouter.delete(
  "/favorite/:id/:courseId",
  studentController.removeStudentFavorite
);
studentRouter.get(
  "/checkFavorite/:studentId/:courseId",
  studentController.checkStudentCourseInFavorite
);
studentRouter.route("/changePassword/:id").put((req, res) => {
  // Validation
  Joi.validate(
    req.body,
    studentValidator.isValidUpdateStudentPassword,
    (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const id = req.params.id;
        studentController.changePassword(req, res, id);
      } catch (error) {
        logger.error(error);
      }
    }
  );
});
studentRouter.get("/:id", studentController.findById);

studentRouter.route("/:id").put((req, res) => {
  Joi.validate(req.body, studentValidator.isValidUpdateStudent, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      const id = req.params.id;
      studentController.updateStudent(req, res, id);
    } catch (error) {
      logger.error(error);
    }
  });
});
studentRouter.delete("/:id", studentController.deleteStudent);

module.exports = studentRouter;
