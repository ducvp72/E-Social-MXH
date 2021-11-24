const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comments: [
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
      },
    ],
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
commentSchema.plugin(paginate);
/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
