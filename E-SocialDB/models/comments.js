const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require("./users");
const moment = require("moment-timezone");
const dateVietNam = moment.tz(Date.now(), "Asia/Bangkok");

const commnentSchema = new Schema(
  {
    parentComment: { type: Schema.Types.ObjectId, rel: "comments" },
    text: String,
    user: { type: Schema.Types.ObjectId, rel: "users" },
    likes: [{ type: Schema.Types.ObjectId, rel: "likes" }],
  },
  {
    timestamps: {},
  }
);
const commentModel = mongoose.model("comments", commnentSchema);
module.exports = commentModel;
