const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { Schema } = mongoose;

const groupSchema = new Schema({
    groupName: {
        type: String,
        required: true,
        trim: true,
    },
    users: [{ type: Schema.Types.ObjectId, rel: 'User' }],
    admin: { type: Schema.Types.ObjectId, rel: 'User' },
    post: [{ type: Schema.Types.ObjectId, rel: 'Post' }],
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