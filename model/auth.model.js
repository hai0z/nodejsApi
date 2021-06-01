const mongoose = require("mongoose");

const userChema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("user", userChema);

module.exports = User;
