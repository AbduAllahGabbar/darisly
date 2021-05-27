const Joi = require("@hapi/joi");
const educationSystemValidator = require("../validators/educationSystem.validator");
const educationSystemService = require("../services/educationSystem.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    educationSystemService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    // Validation
    Joi.validate(
      req.body,
      educationSystemValidator.isValidEducationSystem,
      (err, body) => {
        try {
          if (err) return res.status(422).send(err.details[0]);
          educationSystemService.create(req, res);
        } catch (error) {
          logger.error(error);
        }
      }
    );
  } catch (error) {
    logger.error(error);
  }
};

findById = (req, res) => {
  try {
    const id = req.params.id;
    educationSystemService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateEducationSystem = (req, res) => {
  try {
    const id = req.params.id;
    educationSystemService.updateEducationSystem(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteEducationSystem = (req, res) => {
  try {
    const id = req.params.id;
    educationSystemService.deleteEducationSystem(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  getAllData,
  create,
  findById,
  updateEducationSystem,
  deleteEducationSystem,
};
