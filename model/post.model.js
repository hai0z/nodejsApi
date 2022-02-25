const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
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

const Post = mongoose.model("post", postSchema);

module.exports = Post;
