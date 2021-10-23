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
    img: {
        data: Buffer,
        type: String,
    },
    imageTypes: {
        type: String,
        enum: [imageTypes.AVATAR, imageTypes.POST, imageTypes.OTHER],
        required: true,
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
imageSchema.plugin(toJSON);
imageSchema.plugin(paginate);


/**
 * @typedef Image
 */
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;