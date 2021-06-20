const express = require("express");
const route = express.Router();
const controller = require("../controller/post.controller");

route.get("/", controller.index);
route.get("/add", controller.addPost);
route.get("/edit/:postId", controller.getEditPost);
route.get("/delete/:postId", controller.deletePost);
route.get("/likePost/:postId", controller.likePost);

route.post("/add", controller.createPost);
route.post("/edit/:postId", controller.editPost);
route.post("/delete/:postId", controller.deletePost);
route.post("/likePost/:postId", controller.likePost);
module.exports = route;
