const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment-timezone');
const dateVietNam = moment.tz(Date.now(), "Asia/Bangkok");

const adminSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: {},
  }
);

const adminModel = mongoose.model("admins", adminSchema);
module.exports = adminModel;
