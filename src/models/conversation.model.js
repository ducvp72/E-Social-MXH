const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    conversationType: {
      type: String,
      enum: ['private', 'group'],
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    timestamps: {},
  }
);

conversationSchema.plugin(toJSON);
conversationSchema.plugin(paginate);

/**
 * @typedef conversation
 */
const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
