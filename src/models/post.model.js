const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    file: { type: Schema.Types.ObjectId, ref: 'File' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(toJSON);
postSchema.plugin(paginate);
/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
