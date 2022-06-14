const express = require("express");
const taskModel = require("../models/task_model");

exports.register_task = async (req, res) => {
  const { taskName, completed } = req.body;
  try {
    const task = await taskModel.create({
      taskName,
      completed,
    });
    res.status(201).json({ message: "task registered", task });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

exports.readTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    if (!tasks) {
      res.status(404).json({ message: "tasks not found" });
    }
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(400).send();
  }
};

exports.readTask = async (req, res) => {
  await taskModel.findById({ _id: req.params.id }).exec((err, taskModel) => {
    if (err) {
      return res.status(404).json({ message: "task not found" });
    }
    res.status(200).json({ taskModel });
  });
};

exports.deleteTask = async (req, res) => {
  await taskModel
    .findByIdAndRemove({ _id: req.params.id })
    .exec((err, taskModel) => {
      if (err) {
        return res.status(404).json({ message: "task not found" });
      }
      res.status(200).json({ message: "task deleted", taskModel });
    });
};

exports.updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["taskName", "completed"];
  const inValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!inValidOperation) {
    return res.status(400).json({ message: "inValid updates" });
  }
  try {
    const task = await taskModel.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    res.status(200).json({ message: "task updated", task });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
