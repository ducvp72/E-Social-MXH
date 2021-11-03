const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { Schema } = mongoose;
const moment = require('moment-timezone');


const postSchema = new Schema({
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
    images: [{ type: Schema.Types.ObjectId, rel: 'Imges' }],
    video: { type: Schema.Types.ObjectId, rel: 'Video' },
    audio: { type: Schema.Types.ObjectId, rel: 'Audio' },
    likes: [{ type: Schema.Types.ObjectId, rel: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, rel: 'Comment' }],
}, {
    timestamps: true,
});

postSchema.plugin(toJSON);
postSchema.plugin(paginate);
/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;