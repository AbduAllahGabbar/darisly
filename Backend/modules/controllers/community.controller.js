const Joi = require("@hapi/joi");
const communityValidator = require("../validators/community.validator");
const communityService = require("../services/community.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    communityService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    // Validation
    Joi.validate(req.body, communityValidator.isValidCommunity, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        communityService.create(req, res);
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
    communityService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateCommunity = (req, res) => {
  try {
    const id = req.params.id;
    communityService.updateCommunity(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteCommunity = (req, res) => {
  try {
    const id = req.params.id;
    communityService.deleteCommunity(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
addAnswerIntoCommunity = (req, res) => {
  try {
    Joi.validate(req.body, communityValidator.isValidAnswer, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        const id = req.params.id;
        communityService.addAnswerIntoCommunity(req, res, id);
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};
addMultipleAnswersIntoCommunity = (req, res) => {
  try {
    Joi.validate(
      req.body,
      communityValidator.isValidMultipleAnswers,
      (err, body) => {
        try {
          if (err) return res.status(422).send(err.details[0]);
          const id = req.params.id;
          communityService.addMultipleAnswersIntoCommunity(req, res, id);
        } catch (error) {
          logger.error(error);
        }
      }
    );
  } catch (error) {
    logger.error(error);
  }
};
findAllCommunitiesWithCourseId = (req, res) => {
  try {
    const id = req.params.id;
    communityService.findAllCommunitiesWithCourseId(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateCommunityAnswer = (req, res) => {
  try {
    Joi.validate(
      req.body,
      communityValidator.isValidMultipleAnswers,
      (err, body) => {
        try {
          if (err) return res.status(422).send(err.details[0]);
          const id = req.params.id;
          communityService.updateCommunityAnswer(req, res, id);
        } catch (error) {
          logger.error(error);
        }
      }
    );
  } catch (error) {
    logger.error(error);
  }
};
search = (req, res) => {
  try {
    Joi.validate(req.body, communityValidator.isValidSearch, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        communityService.search(req, res);
      } catch (error) {
        logger.error(error);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  create,
  findById,
  updateCommunity,
  deleteCommunity,
  addAnswerIntoCommunity,
  addMultipleAnswersIntoCommunity,
  findAllCommunitiesWithCourseId,
  updateCommunityAnswer,
  search,
};
