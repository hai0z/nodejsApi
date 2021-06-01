const express = require("express");

const route = express.Router();
const controller = require("../controller/login.controller");

route.get("/", controller.index);
route.get('/logout',controller.logout);

route.post("/login", controller.login);

module.exports = route;
