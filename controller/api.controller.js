const User = require("../model/auth.model");
const md5 = require("md5");

const PAGE_SIZE = 2;

module.exports.getAllUser = async (req, res) => {
  let { page } = req.query;
  if (page) {
    page = parseInt(page);
    let skip = (page - 1) * PAGE_SIZE;
    const user = await User.find({}).skip(skip).limit(PAGE_SIZE);
    return res.status(200).json(user);
  }
  const user = await User.find({});
  return res.status(200).json(user);
};

module.exports.getUser = async (req, res) => {
  const username = req.query.username;
  const user = await User.findOne({ username: username });
  if (user) {
    return res.json(user);
  }
  res.status(404).send("khong ton tai user");
};

module.exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  const userCheck = await User.findOne({ username: username });
  if (!userCheck) {
    const user = new User({
      username: username,
      password: md5(password),
    });
    await user.save();
    return res.status(200).send("tao tai khoan thanh cong");
  }
  return res.status(500).send("tai khoan da ton tai");
};

module.exports.deleteUser = async (req, res) => {
  const { username } = req.body;
  let user = await User.findOne({ username: username });
  if (user) {
    await User.findOneAndDelete({ username: user.username });
    return res.status(200).send("xoa thanh cong " + user.username);
  }
  return res.status(500).send("xoa that bai");
};
