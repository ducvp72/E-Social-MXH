const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;
const moment = require('moment-timezone');

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, rel: 'Post' },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    user: { type: Schema.Types.ObjectId, rel: 'User' },
    likes: [{ type: Schema.Types.ObjectId, rel: 'User' }],
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);
/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
