const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { files } = require('../config/file');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    typeMessage: {
      type: String,
      enum: files,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {},
  }
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
