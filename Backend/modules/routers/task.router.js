const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/task.controller");

taskRouter.get("/", taskController.getAllData);
taskRouter.post("/", taskController.create);
taskRouter.get("/deliveredTasks/:id", taskController.getDeliveredTaskByTaskId);
taskRouter.get(
  "/checkStudentTask/:taskId/:studentId",
  taskController.checkStudentTask
);

taskRouter.put(
  "/replaceTaskAttachment/:id",
  taskController.replaceTaskAttachment
);
taskRouter.get("/:id", taskController.findById);
taskRouter.put("/:id", taskController.updateTask);
taskRouter.delete("/:id", taskController.deleteTask);

module.exports = taskRouter;
