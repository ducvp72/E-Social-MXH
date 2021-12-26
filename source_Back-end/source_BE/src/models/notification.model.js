const mongoose = require('mongoose');
const { toJSONM, paginateNotif } = require('./plugins');

const { Schema } = mongoose;

const notificationSchema = new Schema(
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
    other: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {},
  }
);

notificationSchema.plugin(toJSONM);
notificationSchema.plugin(paginateNotif);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
