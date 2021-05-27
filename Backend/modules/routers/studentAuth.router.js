const express = require("express");
const authRouter = express.Router();
const Joi = require("@hapi/joi");
const authValidator = require("../validators/studentAuth.validator");
const studentController = require("../controllers/student.controller");

// Authentication
authRouter.post("/login", (req, res, next) => {
  Joi.validate(req.body, authValidator.isValidLogin, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      studentController.identifyStudent(req, res);
    } catch (error) {
      console.error(error);
    }
  });
});

// Authentication with Social Media Accounts
authRouter.post("/socialMediaLogin", (req, res, next) => {
  Joi.validate(req.body, authValidator.isValidSocialMediaLogin, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      studentController.socialMediaLogin(req, res);
    } catch (error) {
      console.error(error);
    }
  });
});

// Registration
authRouter.post("/register", (req, res, next) => {
  Joi.validate(req.body, authValidator.isValidRegister, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      studentController.createStudent(req, res);
    } catch (error) {
      console.error(error);
    }
  });
});
// Registration with Social Media Accounts
authRouter.post("/socialMediaRegister", (req, res, next) => {
  Joi.validate(
    req.body,
    authValidator.isValidSocialMediaRegister,
    (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        studentController.socialMediaRegister(req, res);
      } catch (error) {
        console.error(error);
      }
    }
  );
});
authRouter.get("/logout", (req, res, next) => {
  studentController.logout(req, res);
});
module.exports = authRouter;
