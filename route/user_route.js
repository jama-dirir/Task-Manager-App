const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  readUsers,
  readUser,
  register_user,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/user_control");

router.post("/users/login", login);
router.get("/users/list", readUsers);
router.get("/users/read/:id", readUser);
router.post("/users/create", register_user);
router.put("/users/update/:id", updateUser);
router.delete("/users/delete/:id", deleteUser);

module.exports = router;
