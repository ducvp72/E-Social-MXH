const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerSchema = new Schema({
  followers: [{ type: Schema.Types.ObjectId, rel: "users" }],
  users: { type: Schema.Types.ObjectId, rel: "users" },
});

const followersModel = mongoose.model("followers", followerSchema);
module.exports = followersModel;
