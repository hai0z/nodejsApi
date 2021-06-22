const User = require("../model/auth.model");
const Post = require("../model/post.model");

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
  res.status(401).send("khong ton tai user");
};

module.exports.createUser = async (req, res) => {
  const { username, password, repassword } = req.body;
  const userCheck = await User.findOne({ username: username });

  if (
    !username.trim().length ||
    !password.trim().length ||
    !repassword.trim().length
  ) {
    res.json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });
    return;
  }
  if (repassword !== password) {
    res.json({ success: false, message: "Mật khẩu nhập lại không trùng khớp" });
    return;
  }
  if (!userCheck) {
    const user = new User({
      username: username,
      password: md5(password),
    });
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "Đăng kí tài khoản thành công" });
  }
  return res.json({ success: false, message: "Tài khoản đã tồn tại" });
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

// post api

module.exports.getAllPost = async (req, res) => {
  try {
    const post = await Post.find({}).populate("author");
    res.json(post);
  } catch (err) {
    res.json("khong lay đc du lieu");
  }
};

module.exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  const updatePost = await Post.findOneAndUpdate(
    { _id: postId },
    {
      like: post.like + 1,
    },
    { new: true }
  );
  res.status(200).json(updatePost);
};

module.exports.createPost = async (req, res) => {
  const { title, text } = req.body;
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  const post = new Post({ title, text });

  post.author = user;
  user.post.push(post);

  await post.save();
  await user.save();

  res.json({ success: true });
};

module.exports.deletePost = async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    const update = user.post.filter((x) => x._id != postId);
    await User.findOneAndUpdate(
      { _id: userId },
      {
        post: update,
      },
      { new: true, useFindAndModify: false }
    );
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, text } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { title, text },
    { new: true, useFindAndModify: false }
  ).populate("author");
  res.json({ success: true, data: post });
};
