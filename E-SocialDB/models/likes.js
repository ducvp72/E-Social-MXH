const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require('./users')
const moment = require("moment-timezone");
const dateVietNam = moment.tz(Date.now(), "Asia/Bangkok");

const likeSchema = new Schema(
  {
    action: Boolean, // true: like; false: unlike
    users:{type: Schema.Types.ObjectId,rel:'users'}
},
  {
    timestamps: {},
  }
);

const likeModel = mongoose.model('likes',likeSchema);
module.exports = likeModel;
