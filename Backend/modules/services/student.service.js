const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const studentModel = require("../models/student.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

findStudent = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let student = await studentModel.defaultSchema.findOne({ email });
  if (!student) res.status(400).send("Invalid email or password");
  else {
    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");
    else {
      const ONE_WEEK = 604800;
      //Generating the token
      const token = jwt.sign(
        {
          id: student._id,
        },
        process.env.SECRET,
        {
          expiresIn: ONE_WEEK,
        }
      );
      let newStudent = { password, ...student };
      delete newStudent._doc.password;
      return res.status(200).send({
        success: true,
        message: "You can login now",
        student: newStudent._doc,
        token,
      });
    }
  }
};
socialMediaLogin = async (req, res) => {
  const email = req.body.email;
  studentModel.defaultSchema.findOneAndUpdate(
    { email },
    { $set: { socialMediaToken: req.body.socialMediaToken } },
    {
      // While Update: show last updated document with new values
      new: true,
      // While Update: the default values will inserted without passing values explicitly
      setDefaultsOnInsert: true,
    },
    function (err, student) {
      if (err) res.status(500).send(err);
      else {
        if (!student) res.status(400).send("Invalid email");
        else {
          const ONE_WEEK = 604800;
          //Generating the token
          const token = jwt.sign(
            {
              id: student._id,
            },
            process.env.SECRET,
            {
              expiresIn: ONE_WEEK,
            }
          );
          let newStudent = { ...student };
          delete newStudent._doc.password;
          return res.status(200).send({
            success: true,
            message: "You can login now",
            student: newStudent._doc,
            token,
          });
        }
      }
    }
  );
};
findAllStudents = async (req, res) => {
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  let students = await studentModel.defaultSchema
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .populate(["educationSystem", "grade"])
    .select({ password: 0, __v: 0 });
  if (!students) res.status(500).send("No Students Found");
  else return res.status(200).send(students);
};
addPurchaseIntoStudent = async (req, res, id, type) => {
  return new Promise((resolve, reject) => {
    const lessonIds = req.body.lessons.map((e) => e.lessonId);
    studentModel.defaultSchema.updateOne(
      {
        _id: ObjectId(id),
        // "lessons.lessonId": { $nin: lessonIds },
      },
      {
        $addToSet: {
          courses: req.body.courseId,
          lessons: req.body.lessons,
        },
      },
      {
        // While Update: show last updated document with new values
        new: true,
        // While Update: the default values will inserted without passing values explicitly
        setDefaultsOnInsert: true,
      },
      function (err, data) {
        if (err) res.status(500).send(err);
        else if (data === null) res.status(404).send("Student ID is not found");
        else {
          if (type === "other") {
            resolve(data);
          } else {
            if (data.nModified === 0) {
              res
                .status(200)
                .send(
                  "No Data has Modified, Maybe there is a repeating in data"
                );
            } else {
              res.status(200).send("Data has Modified");
            }
          }
        }
      }
    );
  });
};
updateStudentLessonPurchase = async (req, res) => {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const endDate = date.setDate(date.getDate() + req.body.validFor);
    studentModel.defaultSchema.updateOne(
      {
        _id: ObjectId(req.body.studentId),
        "lessons.lessonId": req.body.lessonId,
      },
      {
        $set: {
          "lessons.$.seen": true,
          "lessons.$.validFor": req.body.validFor,
          "lessons.$.startDate": new Date(),
          "lessons.$.endDate": endDate,
        },
      },
      {
        // While Update: show last updated document with new values
        new: true,
        // While Update: the default values will inserted without passing values explicitly
        setDefaultsOnInsert: true,
      },
      function (err, data) {
        if (err) reject(err);
        else if (data === null) reject("ID is not found");
        else resolve("Data updated successfully");
      }
    );
  });
};
findStudentCourses = async (req, res, id) => {
  return new Promise((resolve, reject) => {
    const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    studentModel.defaultSchema
      .find({ _id: ObjectId(id) })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select({ courses: 1, lessons: 1 })
      .exec((err, data) => {
        if (err) res.status(500).send(err);
        else {
          if (data[0].courses.length > 0) {
            resolve(data);
          } else {
            if (data[0].courses.length === 0) {
              res.status(200).send([]);
            } else {
              res.status(200).send(data);
            }
          }
        }
      });
  });
};
findStudentLessons = async (req, res, id, type) => {
  return new Promise((resolve, reject) => {
    const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    studentModel.defaultSchema
      .find({ _id: ObjectId(id) })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select({ lessons: 1 })
      .exec((err, data) => {
        if (err) res.status(500).send(err);
        else {
          if (type === "other") {
            resolve(data);
          } else {
            res.status(200).send(data);
          }
        }
      });
  });
};
addFavoriteIntoStudent = async (req, res, id) => {
  studentModel.defaultSchema.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        favorites: req.body.courseId,
      },
    },
    {
      // While Update: show last updated document with new values
      new: true,
      // While Update: the default values will inserted without passing values explicitly
      setDefaultsOnInsert: true,
    },
    function (err, data) {
      if (err) res.status(500).send(err);
      else if (data === null) res.status(404).send("ID is not found");
      else res.status(200).send(data);
    }
  );
};
removeStudentFavorite = async (req, res, id, courseId) => {
  console.log();
  studentModel.defaultSchema.findByIdAndUpdate(
    id,
    { $pull: { favorites: courseId } },
    { safe: true, multi: true },
    function (err, data) {
      if (err) res.status(500).send(err);
      else if (data === null) res.status(404).send("ID is not found");
      else res.sendStatus(200);
    }
  );
};
findStudentFavorites = async (req, res, id) => {
  return new Promise((resolve, reject) => {
    const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    studentModel.defaultSchema
      .find({ _id: ObjectId(id) })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select({ favorites: 1 })
      .exec((err, data) => {
        if (err) res.status(500).send(err);
        else {
          if (data[0].favorites.length > 0) {
            resolve(data[0].favorites);
          } else {
            res.status(200).send(data);
          }
        }
      });
  });
};
checkStudentCourseInFavorite = async (req, res, studentId, courseId) => {
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
  studentModel.defaultSchema
    .find({ _id: ObjectId(studentId), favorites: { $in: ObjectId(courseId) } })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select({ favorites: 1 })
    .exec((err, data) => {
      if (err) res.status(500).send(err);
      else {
        if (data && data.length > 0) res.status(200).send("Found");
        else res.status(404).send("Not Found");
      }
    });
};
changePassword = async (req, res, id) => {
  let student = await studentModel.defaultSchema.findOne({ _id: id });
  if (!student) res.status(400).send("Invalid data");
  else {
    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      student.password
    );
    if (!validPassword) return res.status(400).send("Wrong old password");
    else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return callback(err);
        }
        bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
          if (err) {
            return next(err);
          }
          req.body.newPassword = hash;
          studentModel.defaultSchema.findByIdAndUpdate(
            id,
            { $set: { password: req.body.newPassword } },
            {
              // While Update: show last updated document with new values
              new: true,
              // While Update: the default values will inserted without passing values explicitly
              setDefaultsOnInsert: true,
            },
            function (err, data) {
              if (err) res.status(500).send(err);
              else if (data === null) res.status(404).send("ID is not found");
              else res.status(200).send(data);
            }
          );
        });
      });
    }
  }
};
findStudentById = (id) => {
  return new Promise(async (resolve, reject) => {
    const student = await studentModel.defaultSchema.findById(id);
    if (student) resolve(student);
    else reject(student);
  });
};
addPromoIntoStudent = async (req, res) => {
  return new Promise((resolve, reject) => {
    studentModel.defaultSchema.updateOne(
      {
        _id: ObjectId(req.body.studentId),
      },
      {
        $addToSet: {
          promoCodes: req.body.promoCode,
        },
      },
      {
        // While Update: show last updated document with new values
        new: true,
        // While Update: the default values will inserted without passing values explicitly
        setDefaultsOnInsert: true,
      },
      function (err, data) {
        if (err) reject(err);
        else if (data === null) reject("Student ID is not found");
        else resolve(data);
      }
    );
  });
};
module.exports = {
  deleteStudent: studentModel.genericSchema.delete,
  updateStudent: studentModel.genericSchema.update,
  findById: studentModel.genericSchema.findById,
  create: studentModel.genericSchema.create,
  findAll: findAllStudents,
  findStudentAccount: findStudent,
  addPurchaseIntoStudent,
  findStudentCourses,
  findStudentLessons,
  addFavoriteIntoStudent,
  findStudentFavorites,
  changePassword,
  updateStudentLessonPurchase,
  checkStudentCourseInFavorite,
  findStudentById,
  removeStudentFavorite,
  socialMediaLogin,
  addPromoIntoStudent,
};
