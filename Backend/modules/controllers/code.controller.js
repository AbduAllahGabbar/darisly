const Joi = require("@hapi/joi");
const codeValidator = require("../validators/code.validator");
const codeService = require("../services/code.service");
const studentController = require("./student.controller");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    codeService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    Joi.validate(req.body, codeValidator.isValidCode, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        codeService.create(req, res);
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
    codeService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateCode = (req, res) => {
  try {
    const id = req.params.id;
    codeService.updateCode(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteCode = (req, res) => {
  try {
    const id = req.params.id;
    codeService.deleteCode(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
checkCode = (req, res) => {
  try {
    Joi.validate(
      req.body,
      codeValidator.isValidCheckCode,
      async (err, body) => {
        try {
          if (err) return res.status(422).send(err.details[0]);
          let codeResult = await codeService.checkCode(req, res);
          if (codeResult) {
            req.body.courseId = codeResult.courseId;
            let allLessons = [];
            for (const element of codeResult.codeLessons) {
              const obj = {
                courseId: codeResult.courseId,
                lessonId: element,
                type: "Code",
                orderId: req.body.code,
              };
              allLessons.push(obj);
            }
            req.body.lessons = allLessons;
            let studentResult = await studentController.addPurchaseIntoStudentByCode(
              req,
              res
            );
            if (studentResult) {
              codeService.updateCheckedCode(req, res, codeResult._id);
            }
          }
        } catch (error) {
          logger.error(error);
        }
      }
    );
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  create,
  findById,
  updateCode,
  deleteCode,
  checkCode,
};
