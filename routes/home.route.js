const exprees = require("express");
const controller = require("../controller/home.controller");
const route = exprees.Router();

route.get("/", controller.index);

route.get("/page/:page", controller.loadPage);
module.exports = route;
