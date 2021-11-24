const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { messageService } = require('../services');

const createMessageText = catchAsync(async (req, res) => {
  const message = await messageService.createMessageText(req.user, req.body.conversationId, req.body.text);
  res.status(httpStatus.OK).send(message);
});
const createMessageMedia = catchAsync(async (req, res) => {
  const message = await messageService.createMessageText(req.user, req.body.conversationId, req.body.text);
  res.status(httpStatus.OK).send(message);
});
const getMessagesFromConversation = catchAsync(async (req, res) => {
  const message = await messageService.getMessagesFromConversation(req.user, req.body.conversationId);
  res.status(httpStatus.OK).send(message);
});

module.exports = {
  createMessageText,
  createMessageMedia,
  getMessagesFromConversation,
};
