const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postShema = new Schema({
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  like: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("post", postShema);

module.exports = Post;
