const express = require("express");
const teacherRouter = express.Router();
const Joi = require("@hapi/joi");
const teacherValidator = require("../validators/teacher.validator");
const teacherController = require("../controllers/teacher.controller");

teacherRouter.get("/", teacherController.getAllData);

teacherRouter.route("/").post((req, res) => {
  // Validation
  Joi.validate(req.body, teacherValidator.isValidTeacher, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      teacherController.createTeacher(req, res);
    } catch (error) {
      logger.error(error);
    }
  });
});
teacherRouter.get("/approved", teacherController.findAllApprovedTeachers);

teacherRouter.route("/personalImage/:id").put((req, res) => {
  // Validation
  Joi.validate(
    req.body,
    teacherValidator.isValidUpdateTeacherProfilePicture,
    (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const id = req.params.id;
        teacherController.updateTeacherPersonalImage(req, res, id);
      } catch (error) {
        logger.error(error);
      }
    }
  );
});
teacherRouter.route("/changePassword/:id").put((req, res) => {
  // Validation
  Joi.validate(
    req.body,
    teacherValidator.isValidUpdateTeacherPassword,
    (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const id = req.params.id;
        teacherController.changePassword(req, res, id);
      } catch (error) {
        logger.error(error);
      }
    }
  );
});
teacherRouter.route("/status/:id").put((req, res) => {
  // Validation
  Joi.validate(
    req.body,
    teacherValidator.isValidUpdateTeacherStatus,
    (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const id = req.params.id;
        teacherController.updateTeacherStatus(req, res, id);
      } catch (error) {
        logger.error(error);
      }
    }
  );
});
teacherRouter.get("/:id", teacherController.findById);

teacherRouter.route("/:id").put((req, res) => {
  // Validation
  Joi.validate(req.body, teacherValidator.isValidUpdateTeacher, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      const id = req.params.id;
      teacherController.updateTeacher(req, res, id);
    } catch (error) {
      logger.error(error);
    }
  });
});
teacherRouter.delete("/:id", teacherController.deleteTeacher);

module.exports = teacherRouter;
