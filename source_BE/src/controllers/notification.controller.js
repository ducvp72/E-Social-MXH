const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { notificationService } = require('../services');

const getNotification = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const Notification = await notificationService.queryNotifications(req.user.id, options);
  res.status(httpStatus.OK).send(Notification);
});
const deleteNotification = catchAsync(async (req, res) => {
  await notificationService.deleteAllNotifications(req.user.id);
  res.status(httpStatus.OK).send();
});

module.exports = {
  getNotification,
  deleteNotification,
};
