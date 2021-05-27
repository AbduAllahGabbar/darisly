const express = require("express");
const authRouter = express.Router();
const Joi = require("@hapi/joi");
const authValidator = require("../validators/adminAuth.validator");
const adminController = require("../controllers/admin.controller");

// Authentication
authRouter.post("/login", (req, res, next) => {
  Joi.validate(req.body, authValidator.isValidLogin, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      adminController.identifyAdmin(req, res);
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
      adminController.createAdmin(req, res);
    } catch (error) {
      console.error(error);
    }
  });
});

authRouter.get("/logout", (req, res, next) => {
  adminController.logout(req, res);
});
module.exports = authRouter;
