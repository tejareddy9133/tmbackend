const express = require("express");

const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../middleware/Auth");
const TaskModel = require("../models/taskmodel/task.model");

const TaskRouter = express.Router();

TaskRouter.post("/create", AuthMiddleware, async (req, res) => {
  const task = req.body;
  console.log(task);
  try {
    if (task) {
      const newTask = await TaskModel(task);
      await newTask.save();
      res.status(201).json({ message: "Task created successfully" });
    } else {
      res.status(400).json({ message: "Invalid request" });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

TaskRouter.patch("/edit/:id", AuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      let _id = id;
      const task = await TaskModel.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      if (task) {
        res.status(200).json({ message: "Task updated successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } else {
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});
TaskRouter.delete("/delete/:id", AuthMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      let _id = id;
      const task = await TaskModel.findByIdAndDelete(_id);
      console.log(task, "deleted");
      if (task) {
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});
TaskRouter.get("/:id", AuthMiddleware, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (id) {
      const task = await TaskModel.find({ userID: id });
      if (task) {
        res.status(200).json({ tasks: task });
        console.log(task);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.message });
  }
});
module.exports = TaskRouter;
