const User = require("../model/auth.model");
module.exports.index = async (req, res) => {
    const user = await User.findOne({ password: req.cookies.userId });
    res.render("./account/index", {
        username: user.username,
    });
};
