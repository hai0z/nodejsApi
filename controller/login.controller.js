const User = require("../model/auth.model");
const md5 = require("md5");

module.exports.index = (_, res) => {
  res.render("index");
};

module.exports.login = async (req, res) => {
  let username = req.body.username;
  let password = md5(req.body.password);

  let userCheck = await User.findOne({ username: username });
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
  res.cookie("userId", userCheck.password);
  res.redirect("/home");
};

module.exports.logout = (_, res) => {
  res.clearCookie("userId");
  res.redirect("/");
  return;
};
