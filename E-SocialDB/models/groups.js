const mongoose = require("mongoose")
const Schema = mongoose.Schema

const groupSchema = new Schema({
    groupname:String,
    users: [{type: Schema.Types.ObjectId, rel:'users'}],
    admin: {type: Schema.Types.ObjectId, rel:'users'},
},
{
    timestamps:{},
}
);

const groupModel= mongoose.model('groups',groupSchema);
module.exports= groupModel;