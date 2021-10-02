const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const dateVietNam = moment.tz(Date.now(), "Asia/Bangkok");

const postSchema = new Schema(
  {
    detail: {
      text: String,
      photo: [],
    },
    likes: [{type: Schema.Types.ObjectId,rel:'likes'}],
    comments: [{type: Schema.Types.ObjectId,rel:'comments'}],
    users:{type: Schema.Types.ObjectId,rel:'users'}
  },
  {
    timestamps: {},
  }
);

module.exports = postSchema;
