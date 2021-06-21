const exprees = require("express");
const route = exprees.Router();
const controller = require("../controller/api.controller");

route.get("/", controller.getAllUser);
route.get("/user", controller.getUser);

route.get("/post", controller.getAllPost);

route.get("/likePost/:postId", controller.likePost);

route.post("/create", controller.createUser);
route.delete("/delete", controller.deleteUser);

route.post("/createPost/:userId", controller.createPost);
route.delete("/deletePost/:postId/:userId", controller.deletePost);
route.put("/updatePost/:postId", controller.updatePost);

module.exports = route;
