const mongoose = require('mongoose');
const { toJSON, paginateC } = require('./plugins');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(toJSON);
commentSchema.plugin(paginateC);
/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
