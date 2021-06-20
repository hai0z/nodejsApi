const exprees = require("express");
const route = exprees.Router();
const controller = require("../controller/account.controller");

route.get("/", controller.index);

module.exports = route;
