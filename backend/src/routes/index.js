const express = require("express");
const wwebRoutes = require("./wweb");
const sheetsRoutes = require("./sheets");

const Router = express.Router();

Router.use("/groups", wwebRoutes);
Router.use("/sheets", sheetsRoutes);

module.exports = Router;
