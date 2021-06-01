const exprees = require("express");
const route = exprees.Router();
const controller = require("../controller/api.controller");

route.get("/", controller.getAllUser);
route.get("/user", controller.getUser);

route.post("/create", controller.createUser);
route.post("/delete", controller.deleteUser);

module.exports = route;
