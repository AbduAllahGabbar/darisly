const Joi = require("@hapi/joi");
const courseValidator = require("../validators/course.validator");
const courseService = require("../services/course.service");
const logger = require("../../helpers/logging");

getAllData = (req, res) => {
  try {
    req.body.isDeleted = false;
    courseService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};
getAllDeletedCourses = (req, res) => {
  try {
    req.body.isDeleted = true;
    courseService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};
create = (req, res) => {
  try {
    // Validation
    Joi.validate(req.body, courseValidator.isValidCourse, (err, body) => {
      try {
        if (err) return res.status(422).send(err.details[0]);
        courseService.create(req, res);
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
    courseService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateCourse = (req, res) => {
  try {
    const id = req.params.id;
    courseService.updateCourse(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteCourse = (req, res) => {
  try {
    const id = req.params.id;
    courseService.deleteCourse(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
findTeacherCoursesByTeacherId = (req, res) => {
  try {
    const id = req.params.id;
    courseService.findTeacherCoursesByTeacherId(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
getNewReleasesCourses = (req, res) => {
  try {
    courseService.getNewReleasesCourses(req, res);
  } catch (error) {
    logger.error(error);
  }
};
getStudentCourses = (req, res) => {
  try {
    courseService.getStudentCourses(req, res);
  } catch (error) {
    logger.error(error);
  }
};
getExclusiveCourses = (req, res) => {
  try {
    courseService.getExclusiveCourses(req, res);
  } catch (error) {
    logger.error(error);
  }
};
filterCourse = (req, res) => {
  try {
    courseService.filterCourse(req, res);
  } catch (error) {
    logger.error(error);
  }
};
findStudentCourseById = (req, res, id) => {
  try {
    return courseService.findStudentCourseById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
addStudentIntoCourse = (courseId, studentId) => {
  try {
    return courseService.addStudentIntoCourse(courseId, studentId);
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  create,
  findById,
  updateCourse,
  deleteCourse,
  getAllDeletedCourses,
  findTeacherCoursesByTeacherId,
  getNewReleasesCourses,
  getStudentCourses,
  getExclusiveCourses,
  filterCourse,
  findStudentCourseById,
  addStudentIntoCourse,
};
