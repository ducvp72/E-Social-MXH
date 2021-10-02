const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const dateVietNam = moment.tz(Date.now(), "Asia/Bangkok");

const userSchema = new Schema(
  {
    fullname: { type: String, require: true },
    birth: { type: Date, require: true },
    gender: { type: Number }, // 0: woman, 1: man, 2: other
    university: { type: String },
    email: { type: String, required: true },
    image: { type: String, default:"userimage"},
    nickname: {type:String, default: "usernick"},
    username: { type: String, required: true },
    password: { type: String, required: true },
    isactive: {type: Boolean}, // true: online; false: offline
    isconfirmed:{type: Number, default: 0}, // 0: chua xn; 1: da xn, 2: ban
  },
  {
    timestamps: {},
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
