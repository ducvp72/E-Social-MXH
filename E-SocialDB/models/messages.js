const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    groups:{type: Schema.Types.ObjectId,rel: 'groups'},
    sender:{type: Schema.Types.ObjectId,rel: 'users'},
    reciever:{type: Schema.Types.ObjectId,rel: 'users'},
    text:String
},{
    timestamps:{},
});

const messageModel = mongoose.model('messages', messageSchema);
module.exports = messageModel; 