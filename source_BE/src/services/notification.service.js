const httpStatus = require('http-status');
const { Notification } = require('../models');
const ApiError = require('../utils/ApiError');

const queryNotifications = async (userId, options) => {
  const notification = await Notification.paginate(userId, options);
  return notification;
};
const createNotification = async (userId, text, other) => {
  const newNotification = new Notification({
    user: userId,
    text,
    other,
  });
  try {
    const conversation = await newNotification.save();
    return conversation;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const deleteAllNotifications = async (userId) => {
  const notification = await Notification.findOne({ user: userId });
  if(!notification) throw new ApiError(httpStatus.BAD_REQUEST, 'Notification has been removed');
  try {
    await Notification.deleteMany({ user: userId });
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
module.exports = {
  queryNotifications,
  createNotification,
  deleteAllNotifications,
};
