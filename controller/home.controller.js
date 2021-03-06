const User = require("../model/auth.model");
const Post = require("../model/post.model");

module.exports.index = async (req, res) => {
  const user = await User.findOne({ password: req.cookies.userId });
  let post = await Post.find({ author: user._id }).populate("author");
  post = post.map((post) => post.toObject());
  res.render("home", {
    post,
    username: user.username,
  });
};

