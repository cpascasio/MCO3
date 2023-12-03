const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: String,
    required: true,
  },
  storeID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  media: {
    type: [String],
  },
  rating: {
    type: Number,
    required: true,
  },
  helpful: {
    type: Number,
    default: 0,
  },
  notHelpful: {
    type: Number,
    default: 0,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  commentID: [{
    type: Schema.Types.ObjectId,
    ref: "Comment",
  }],
});

module.exports = mongoose.model("Post", postSchema, "Posts");
