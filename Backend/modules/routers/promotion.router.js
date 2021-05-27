const express = require("express");
const promotionRouter = express.Router();
const promotionController = require("../controllers/promotion.controller");
const roles = require("../../helpers/roles");

promotionRouter.get(
  "/",
  roles.isAuthenticatedAsStudent,
  promotionController.getAllData
);

module.exports = promotionRouter;
