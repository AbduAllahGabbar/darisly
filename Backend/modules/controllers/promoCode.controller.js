const promoCodeValidator = require("../validators/promoCode.validator");
const Joi = require("@hapi/joi");
const promoCodeService = require("../services/promoCode.service");
const logger = require("../../helpers/logging");
const studentController = require("./student.controller");

getAllData = (req, res) => {
  try {
    promoCodeService.findAll(req, res, "default");
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    Joi.validate(req.body, promoCodeValidator.isValidPromoCode, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        promoCodeService.create(req, res);
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
    promoCodeService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updatePromoCode = (req, res) => {
  try {
    const id = req.params.id;
    promoCodeService.updatePromoCode(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deletePromoCode = (req, res) => {
  try {
    const id = req.params.id;
    promoCodeService.deletePromoCode(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
findAllPromosWithOutExec = (req, res) => {
  try {
    return promoCodeService.findAll(req, res, "other");
  } catch (error) {
    logger.error(error);
  }
};
findPromoValueByCode = async (req, res) => {
  try {
    if (!req.body.promoCode) {
      return res.status(403).send("Promo Code is Required");
    }
    if (!req.body.studentId) {
      return res.status(403).send("Student Id is Required");
    }
    const result = await studentController.addPromoIntoStudent(req, res);
    if (result.nModified === 0) {
      return res.status(406).send("Promo code already used");
    } else {
      promoCodeService.findPromoValueByCode(req, res);
    }
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  create,
  findById,
  updatePromoCode,
  deletePromoCode,
  findAllPromosWithOutExec,
  findPromoValueByCode,
};
