const express = require("express");
const {
  getGroupsController,
  updateGroupsController,
  sendToGroupController,
} = require("../../controllers/wweb");
const wwebRoutes = express.Router();

wwebRoutes.get("/reset", getGroupsController);
wwebRoutes.post("/send", sendToGroupController);
wwebRoutes.put("/:to", updateGroupsController);

module.exports = wwebRoutes;
