const express = require("express");
const authRouter = express.Router();
const Joi = require("@hapi/joi");
const authValidator = require("../validators/teacherAuth.validator");
const teacherController = require("../controllers/teacher.controller");

// Authentication
authRouter.post("/login", (req, res) => {
  Joi.validate(req.body, authValidator.isValidLogin, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      teacherController.identifyTeacher(req, res);
    } catch (error) {
      console.error(error);
    }
  });
});

// Authentication with Social Media Accounts
authRouter.post("/socialMediaLogin", (req, res) => {
  Joi.validate(req.body, authValidator.isValidSocialMediaLogin, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      teacherController.socialMediaLogin(req, res);
    } catch (error) {
      console.error(error);
    }
  });
});

// Registration
authRouter.post("/register", (req, res) => {
  Joi.validate(req.body, authValidator.isValidRegister, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      teacherController.createTeacher(req, res);
    } catch (error) {
      console.error(error);
    }
  });
});

// Registration with Social Media Accounts
authRouter.post("/socialMediaRegister", (req, res) => {
  Joi.validate(
    req.body,
    authValidator.isValidSocialMediaRegister,
    (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        teacherController.socialMediaRegister(req, res);
      } catch (error) {
        console.error(error);
      }
    }
  );
});

authRouter.get("/logout", (req, res) => {
  teacherController.logout(req, res);
});
module.exports = authRouter;
