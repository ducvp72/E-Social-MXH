const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followingSchema = new Schema({
    users: [{type: Schema.Types.ObjectId,rel:'users'}],
    user:{type: Schema.Types.ObjectId,rel:'users'}
});

const followingModel = mongoose.model('followings', followingSchema)
module.exports= followingModel;