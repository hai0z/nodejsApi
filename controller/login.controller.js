const User = require("../model/auth.model");
const md5 = require("md5");

module.exports.index = async (req, res) => {
  const user = await User.findOne({ password: req.cookies.userId });
  if (user && req.cookies.userId) res.redirect("/home");
  res.render("index", {
    layout: false,
  });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const userCheck = await User.findOne({ username: username });
  if (!userCheck) {
    res.render("index", {
      layout: false,
      error: ["Tài khoản không tồn tại"],
      username,
    });
    return;
  }

  if (userCheck.password != md5(password)) {
    res.render("index", {
      error: ["Sai mật khẩu"],
      username,
      layout: false,
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
