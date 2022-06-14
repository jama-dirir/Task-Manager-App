const express = require("express");
const userRoute = require("./route/user_route");
const taskRoute = require("./route/task_route");
require("./db/mongoose");
// require("dotenv").config({ path: "./config/.env" }); //specific env path
const app = express();

app.use(express.json());

app.use(userRoute);
app.use(taskRoute);

module.exports = app;
