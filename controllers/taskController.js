const Task = require("../models/taskModel");
const asyncWrapper = require("../middlewares/asyncHandler");
const { createCustomError } = require("../errors/customError");
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    Message: "Here are all tasks",
    tasks,
  });
});
const createTask = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const newTask = await Task.create({ name });
  res.status(200).json({
    message: "Task created successfully!",
    task: newTask,
  });
});
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({
    task,
  });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({
    message: "Task has been updated successfully",
  });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({
    message: "Task has been deleted successfully",
  });
});
module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
