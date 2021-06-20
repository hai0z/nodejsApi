const mongoose = require("mongoose");

const userChema = new mongoose.Schema({
  username: String,
  password: String,
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const User = mongoose.model("user", userChema);

module.exports = User;
