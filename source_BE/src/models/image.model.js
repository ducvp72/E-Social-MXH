const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { imageTypes } = require('../config/image');
const imageSchema = mongoose.Schema({
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
    imageTypes: {
        type: String,
        enum: [imageTypes.AVATAR, imageTypes.POST, imageTypes.OTHER],
        required: true,
    },
    fileId: {
        required: true,
        type: String,
    },
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
imageSchema.plugin(toJSON);
imageSchema.plugin(paginate);


/**
 * @typedef Image
 */
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;