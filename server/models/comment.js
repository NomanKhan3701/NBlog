const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  reply: {
    type: [String],
    default: [],
  },
  postedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
