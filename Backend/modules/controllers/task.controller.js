const Joi = require("@hapi/joi");
const taskValidator = require("../validators/task.validator");
const taskService = require("../services/task.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    taskService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

create = (req, res) => {
  try {
    // Validation
    Joi.validate(req.body, taskValidator.isValidTask, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        taskService.create(req, res);
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
    taskService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateTask = (req, res) => {
  try {
    const id = req.params.id;
    taskService.updateTask(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteTask = (req, res) => {
  try {
    const id = req.params.id;
    taskService.deleteTask(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
getDeliveredTaskByTaskId = (req, res) => {
  try {
    const id = req.params.id;
    taskService.getDeliveredTaskByTaskId(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
checkStudentTask = (req, res) => {
  try {
    const taskId = req.params.taskId;
    const studentId = req.params.studentId;
    taskService.checkStudentTask(req, res, taskId, studentId);
  } catch (error) {
    logger.error(error);
  }
};
replaceTaskAttachment = (req, res) => {
  try {
    Joi.validate(
      req.body,
      taskValidator.isValidReplaceTaskAttachment,
      (err, body) => {
        try {
          if (err) return res.status(422).send(err.details[0]);
          const id = req.params.id;
          taskService.replaceTaskAttachment(req, res, id);
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
  updateTask,
  deleteTask,
  getDeliveredTaskByTaskId,
  replaceTaskAttachment,
  checkStudentTask,
};
