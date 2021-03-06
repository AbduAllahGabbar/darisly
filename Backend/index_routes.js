const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use(passport.initialize());
router.use(passport.session());

require("./helpers/passport")(passport);

const errorMiddleware = require("./helpers/error");

const routes = require("./modules/routes");
const teacherAuthRouter = require("./modules/routers/teacherAuth.router");
const studentAuthRouter = require("./modules/routers/studentAuth.router");
const adminAuthRouter = require("./modules/routers/adminAuth.router");
const educationSystemRouter = require("./modules/routers/educationSystem.router");
const gradeRouter = require("./modules/routers/grade.router");
const paymentRouter = require("./modules/routers/payment.router");

router.use("/teacherAuth", teacherAuthRouter);
router.use("/studentAuth", studentAuthRouter);
router.use("/adminAuth", adminAuthRouter);
router.use("/educationSystem", educationSystemRouter);
router.use("/grade", gradeRouter);
router.use("/payment", paymentRouter);

router.use(
  passport.authenticate("jwt", {
    session: false,
  })
);

router.use("/", routes);

router.use(errorMiddleware);

module.exports = router;
