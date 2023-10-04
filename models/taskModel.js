const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A task should have a name!"],
    trim: true,
    minlength: [3, "Too short task"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
