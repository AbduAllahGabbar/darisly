const Joi = require("@hapi/joi");
const chapterValidator = require("../validators/chapter.validator");
const chapterService = require("../services/chapter.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    chapterService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    // Validation
    Joi.validate(req.body, chapterValidator.isValidChapter, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        chapterService.create(req, res);
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
    chapterService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateChapter = (req, res) => {
  try {
    const id = req.params.id;
    chapterService.updateChapter(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteChapter = (req, res) => {
  try {
    const id = req.params.id;
    chapterService.deleteChapter(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  create,
  findById,
  updateChapter,
  deleteChapter,
};
