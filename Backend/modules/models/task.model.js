const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const taskSchema = new Schema({
  taskId: {
    type: ObjectId,
    required: true,
  },
  studentId: {
    type: ObjectId,
    required: true,
    ref: "student",
  },
  deliveredTask: {
    type: String,
    required: true,
  },
  score: Number,
});
taskSchema.index({ taskId: 1, studentId: 1 }, { unique: true });
const genericOperations = require("../genericService");
module.exports = {
  genericSchema: genericOperations(mongoose.model("task", taskSchema)),
  defaultSchema: mongoose.model("task", taskSchema),
};
