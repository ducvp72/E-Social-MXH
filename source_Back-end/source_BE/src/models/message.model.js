const mongoose = require('mongoose');
const { toJSONM, paginate } = require('./plugins');
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
      text: {
        type: String,
      },
      file: {
        type: String,
      },
    },
    index: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {},
  }
);

messageSchema.plugin(toJSONM);
messageSchema.plugin(paginate);

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
