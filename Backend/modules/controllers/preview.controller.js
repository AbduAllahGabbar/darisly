const Joi = require("@hapi/joi");
const previewValidator = require("../validators/preview.validator");
const previewService = require("../services/preview.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    previewService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    Joi.validate(req.body, previewValidator.isValidPreview, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        previewService.create(req, res);
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

findById = (req, res) => {
  try {
    const id = req.params.id;
    previewService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updatePreview = (req, res) => {
  try {
    const id = req.params.id;
    previewService.updatePreview(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deletePreview = (req, res) => {
  try {
    const id = req.params.id;
    previewService.deletePreview(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  getAllData,
  create,
  findById,
  updatePreview,
  deletePreview,
};
