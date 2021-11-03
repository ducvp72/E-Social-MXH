const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, rel: 'users' },
    text: {
        type: String,
        required: true,
        trim: true,
    }

}, {
    timestamps: {},
});

notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;