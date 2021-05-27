const studentService = require("../services/student.service");
const bcrypt = require("bcryptjs");
const logger = require("../../helpers/logging");
const courseController = require("./course.controller");

getAllData = (req, res) => {
  try {
    studentService.findAll(req, res);
  } catch (error) {
    logger.error(error);
  }
};

createStudent = (req, res, next) => {
  try {
    if (req.body.password.length < 6) {
      return res.status(403).send("Password must be at least 6 chars");
    }
    if (req.body.password != req.body.confirmPassword)
      return res.status(403).send("Password is not equal to confirm password");
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return callback(err);
      }
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        req.body.password = hash;
        delete req.body.confirmPassword;
        studentService.create(req, res);
      });
    });
  } catch (error) {
    logger.error(error);
  }
};
socialMediaRegister = (req, res) => {
  try {
    studentService.create(req, res);
  } catch (error) {
    logger.error(error);
  }
};
findById = (req, res) => {
  try {
    const id = req.params.id;
    studentService.findById(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateStudent = (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.email) {
      return res.status(403).send("Email Cannot be updated");
    }
    studentService.updateStudent(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
deleteStudent = (req, res) => {
  try {
    const id = req.params.id;
    studentService.deleteStudent(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
identifyStudent = (req, res) => {
  try {
    studentService.findStudentAccount(req, res);
  } catch (error) {
    logger.error(error);
  }
};
socialMediaLogin = (req, res) => {
  try {
    studentService.socialMediaLogin(req, res);
  } catch (error) {
    logger.error(error);
  }
};
logout = (req, res) => {
  student = {};
  token = null;
};
addPurchaseIntoStudent = async (req, res) => {
  try {
    const id = req.params.id;
    try {
      let result = await courseController.addStudentIntoCourse(
        req.body.courseId,
        id
      );
      if (result)
        studentService.addPurchaseIntoStudent(req, res, id, "default");
    } catch (error) {
      res.send(error);
    }
  } catch (error) {
    logger.error(error);
  }
};
addPurchaseIntoStudentByCode = async (req, res) => {
  try {
    const id = req.body.studentId;
    try {
      let result = await courseController.addStudentIntoCourse(
        req.body.courseId,
        id
      );
      if (result)
        return studentService.addPurchaseIntoStudent(req, res, id, "other");
    } catch (error) {
      res.send(error);
    }
  } catch (error) {
    logger.error(error);
  }
};
findStudentCourses = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await studentService.findStudentCourses(req, res, id);
    if (result) {
      req.body.courses = result[0].courses;
      req.body.lessons = result[0].lessons;
      courseController.getStudentCourses(req, res);
    }
  } catch (error) {
    logger.error(error);
  }
};
findStudentLessons = (req, res) => {
  try {
    const id = req.params.id;
    studentService.findStudentLessons(req, res, id, "default");
  } catch (error) {
    logger.error(error);
  }
};
addFavoriteIntoStudent = (req, res) => {
  try {
    const id = req.params.id;
    studentService.addFavoriteIntoStudent(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
removeStudentFavorite = (req, res) => {
  try {
    const id = req.params.id;
    const courseId = req.params.courseId;
    studentService.removeStudentFavorite(req, res, id, courseId);
  } catch (error) {
    logger.error(error);
  }
};
findStudentFavorites = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await studentService.findStudentFavorites(req, res, id);
    if (result) {
      req.body.courses = result;
      courseController.getStudentCourses(req, res);
    }
  } catch (error) {
    logger.error(error);
  }
};
checkStudentCourseInFavorite = (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    studentService.checkStudentCourseInFavorite(req, res, studentId, courseId);
  } catch (error) {
    logger.error(error);
  }
};
changePassword = (req, res) => {
  try {
    const id = req.params.id;
    studentService.changePassword(req, res, id);
  } catch (error) {
    logger.error(error);
  }
};
updateStudentLessonPurchase = (req, res) => {
  try {
    return studentService.updateStudentLessonPurchase(req, res);
  } catch (error) {
    logger.error(error);
  }
};
findStudentCourseByCourseId = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    let course = await courseController.findStudentCourseById(
      req,
      res,
      courseId
    );
    let studentLessons = await studentService.findStudentLessons(
      req,
      res,
      studentId,
      "other"
    );
    let obj = {
      course: course[0],
      studentLessons: studentLessons[0],
    };
    res.send(obj);
  } catch (error) {
    logger.error(error);
  }
};
findStudentById = async (id) => {
  try {
    return await studentService.findStudentById(id);
  } catch (error) {
    logger.error(error);
  }
};
addPromoIntoStudent = (req, res) => {
  try {
    return studentService.addPromoIntoStudent(req, res);
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  getAllData,
  createStudent,
  findById,
  updateStudent,
  deleteStudent,
  identifyStudent,
  logout,
  addPurchaseIntoStudent,
  findStudentCourses,
  findStudentLessons,
  addFavoriteIntoStudent,
  findStudentFavorites,
  changePassword,
  updateStudentLessonPurchase,
  findStudentCourseByCourseId,
  checkStudentCourseInFavorite,
  findStudentById,
  addPurchaseIntoStudentByCode,
  removeStudentFavorite,
  socialMediaRegister,
  socialMediaLogin,
  addPromoIntoStudent,
};
