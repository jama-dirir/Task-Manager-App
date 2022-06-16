const express = require("express");
const router = express.Router();

const {
  readTasks,
  readTask,
  register_task,
  updateTask,
  deleteTask,
} = require("../controllers/task_control");

router.get("/users/list", readTasks);
router.get("/users/read/:id", readTask);
router.post("/users/create", register_task);
router.put("/users/update/:id", updateTask);
router.delete("/users/delete/:id", deleteTask);

module.exports = router;
