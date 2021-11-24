const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { conversationService } = require('../services');

const getUser = catchAsync(async (req, res) => {
  const conversation = await conversationService.getUser(req.user.id, req.body.conversationId);
  res.status(httpStatus.OK).send(conversation);
});
const createPrivate = catchAsync(async (req, res) => {
  const conversation = await conversationService.createPrivate(req.user.id, req.body.userId);
  res.status(httpStatus.OK).send(conversation);
});
const createGroup = catchAsync(async (req, res) => {
  const conversation = await conversationService.createGroup(req.user.id, req.body.groupUserId);
  res.status(httpStatus.OK).send(conversation);
});
const addMemberToGroup = catchAsync(async (req, res) => {
  const conversation = await conversationService.addMemberToGroup(req.user.id, req.body.userId);
  res.status(httpStatus.OK).send(conversation);
});
const getPrivateConversation = catchAsync(async (req, res) => {
  const conversation = await conversationService.getPrivate(req.user.id, req.body.userId);
  res.status(httpStatus.OK).send(conversation);
})
module.exports = {
  getUser,
  createPrivate,
  addMemberToGroup,
  createGroup,
  getPrivateConversation,
};
