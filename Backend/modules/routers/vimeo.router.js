const express = require("express");
const vimeoRouter = express.Router();
const vimeoController = require("../controllers/vimeo.controller");

vimeoRouter.get("/:id", vimeoController.findById);
vimeoRouter.get("/student/:id", vimeoController.findByIdAndUpdateStudent);

module.exports = vimeoRouter;
