const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, rel: 'User' },
    reciever: { type: Schema.Types.ObjectId, rel: 'User' },
    text: {
        type: [String],
        required: true,
        trim: true,
    },
}, {
    timestamps: {},
});

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;