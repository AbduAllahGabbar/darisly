const express = require("express");
const adminRouter = express.Router();
const Joi = require("@hapi/joi");
const logger = require("../../helpers/logging");
const adminController = require("../controllers/admin.controller");
const adminValidator = require("../validators/admin.validator");
const roles = require("../../helpers/roles");

adminRouter.get("/", roles.isAuthenticatedAsAdmin, adminController.getAllData);

adminRouter.route("/").post((req, res) => {
  // Validation
  Joi.validate(req.body, adminValidator.isValidTeacher, (err, body) => {
    try {
      if (err) return res.status(422).send(err.details[0]);
      adminController.createAdmin(req, res);
    } catch (error) {
      logger.error(error);
    }
  });
});
adminRouter.get("/:id", roles.isAuthenticatedAsAdmin, adminController.findById);
adminRouter.put(
  "/:id",
  roles.isAuthenticatedAsAdmin,
  adminController.updateAdmin
);
adminRouter.delete(
  "/:id",
  roles.isAuthenticatedAsAdmin,
  adminController.deleteAdmin
);

module.exports = adminRouter;
