const Joi = require("@hapi/joi");
const packageValidator = require("../validators/package.validator");

const packageService = require("../services/package.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    packageService.findAll(req, res, "default");
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    Joi.validate(req.body, packageValidator.isValidPackage, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        packageService.create(req, res);
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
    packageService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updatePackage = (req, res) => {
  try {
    const id = req.params.id;
    packageService.updatePackage(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deletePackage = (req, res) => {
  try {
    const id = req.params.id;
    packageService.deletePackage(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
findAllPackagesWithOutExec = (req, res) => {
  try {
    return packageService.findAll(req, res, "other");
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  create,
  findById,
  updatePackage,
  deletePackage,
  findAllPackagesWithOutExec,
};
