const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    user:{type: Schema.Types.ObjectId,rel:'users'},
    text:String
},{
    timestamps:{},
});

const notificationModel = mongoose.model('notifications', notificationSchema);
module.exports = notificationModel; 