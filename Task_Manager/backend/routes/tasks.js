const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user });
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Task updated" });
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
