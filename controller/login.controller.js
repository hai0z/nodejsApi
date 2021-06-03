const User = require("../model/auth.model");
const md5 = require("md5");

module.exports.index = async (req, res) => {
  const user = await User.findOne({ password: req.cookies.userId });
  if (user && req.cookies.userId) res.redirect("/home");
  res.render("index", {
    username: req.cookies.username,
    password: req.cookies.password,
  });
};

module.exports.login = async (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);
  const remember = req.body.remember || false;
  const userCheck = await User.findOne({ username: username });
  if (!userCheck) {
    res.render("index", {
      error: ["tai khoan khong ton tai"],
      value: username,
    });
    return;
  }

  if (userCheck.password != password) {
    res.render("index", {
      error: ["sai mat khau"],
      value: username,
    });
    return;
  }
  if (remember == "true") {
    res.cookie("username", username);
    res.cookie("password", req.body.password);
  }
  res.cookie("userId", userCheck.password);
  res.redirect("/home");
};

module.exports.logout = (_, res) => {
  res.clearCookie("userId");
  res.redirect("/");
  return;
};
