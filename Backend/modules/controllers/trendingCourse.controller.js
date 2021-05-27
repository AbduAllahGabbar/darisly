const trendingValidator = require("../validators/trendingCourse.validator");
const Joi = require("@hapi/joi");
const trendingCourseService = require("../services/trendingCourse.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    trendingCourseService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    // Validation
    Joi.validate(
      req.body,
      trendingValidator.isValidTrendingCourse,
      (err, body) => {
        try {
          if (err) return res.status(422).send(err.details[0]);
          trendingCourseService.create(req, res);
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
    trendingCourseService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateTrendingCourse = (req, res) => {
  try {
    const id = req.params.id;
    trendingCourseService.updateTrendingCourse(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteTrendingCourse = (req, res) => {
  try {
    const id = req.params.id;
    trendingCourseService.deleteTrendingCourse(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  getAllData,
  create,
  findById,
  updateTrendingCourse,
  deleteTrendingCourse,
};
