const mongoose = require("mongoose");

// Define the schema
const taskSchema = new mongoose.Schema(
  {
    tasktitle: { type: String, required: true },
    taskdescription: { type: String, required: true },
    status: { type: Boolean, required: true },
    user: { type: String, required: true },
    userID: { type: String, required: true }, // Assuming userID is a string
    iat: { type: Number, required: true }, // Unix timestamp or integer value
    date: { type: Date, required: true }, // Date object
    created: { type: String, required: true }, // Date string as provided
  },
  {
    versionKey: false,
  }
);

// Create the model
const TaskModel = mongoose.model("tasks", taskSchema);

module.exports = TaskModel;
