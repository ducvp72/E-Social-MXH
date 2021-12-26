const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { Schema } = mongoose;

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
        trim: true,
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
    post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
}, {
    timestamps: {},
});

groupSchema.plugin(toJSON);
groupSchema.plugin(paginate);
/**
 * @typedef Group
 */
const Group = mongoose.model('Group', groupSchema);
module.exports = Group;