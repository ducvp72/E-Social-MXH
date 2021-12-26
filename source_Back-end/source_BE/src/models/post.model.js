const mongoose = require('mongoose');
const { toJSON, paginateP } = require('./plugins');
const { files } = require('../config/file');
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
    fileTypes: {
      type: String,
      enum: files,
      required: true,
    },
    file: { type: Schema.Types.ObjectId },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(toJSON);
postSchema.plugin(paginateP);
/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
