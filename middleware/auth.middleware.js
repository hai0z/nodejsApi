const User = require("../model/auth.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.userId) {
    res.redirect("/");
    return;
  }
  const user = await User.findOne({ password: req.cookies.userId });
  if (!user) {
    res.redirect("/");
    return;
  }
  next();
};
