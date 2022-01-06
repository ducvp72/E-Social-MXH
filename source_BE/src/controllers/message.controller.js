const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { messageService } = require('../services');

const createMessageText = catchAsync(async (req, res) => {
  const message = await messageService.createMessageText(req.user.id, req.body.conversationId, req.body.text);
  res.status(httpStatus.OK).send(message);
});
const createMessageMedia = catchAsync(async (req, res) => {
  const message = await messageService.createMessageMedia(req.file, req.user.id, req.body.conversationId,req.body.text);
  res.status(httpStatus.OK).send(message);
});
const likeIcon = catchAsync(async (req, res) => {
  const message = await messageService.likeIcon(req.user.id, req.params.conversationId);
  res.status(httpStatus.OK).send(message);
});
const loveIcon = catchAsync(async (req, res) => {
  const message = await messageService.loveIcon(req.user.id, req.params.conversationId);
  res.status(httpStatus.OK).send(message);
});
const callUser = catchAsync(async (req, res) => {
  const message = await messageService.callUser(req.user.id, req.params.conversationId);
  res.status(httpStatus.OK).send(message);
});
const answerCall = catchAsync(async (req, res) => {
  const message = await messageService.recallMessagesFromConversation(req.user.id,req.body.conversationId,req.body.messageId);
  res.status(httpStatus.OK).send(message);
});

const getMessagesFromConversation = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'typeMessage']);
  const message = await messageService.getMessagesFromConversation(req.user.id, req.params.conversationId, options);
  res.status(httpStatus.OK).send(message);
});
const recallMessagesFromConversation = catchAsync(async (req,res) => {
  const message = await messageService.recallMessagesFromConversation(req.user.id,req.body.conversationId,req.body.messageId);
  res.status(httpStatus.OK).send(message);
});
module.exports = {
  createMessageText,
  createMessageMedia,
  getMessagesFromConversation,
  recallMessagesFromConversation,
  likeIcon,
  loveIcon,
  callUser,
  answerCall,
};
