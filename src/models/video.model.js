const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const videoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    des: {
        type: String,
        required: false,
        trim: true,
    },
    fileId: {
        required: true,
        type: String,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
videoSchema.plugin(toJSON);
videoSchema.plugin(paginate);


/**
 * @typedef Image
 */
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;