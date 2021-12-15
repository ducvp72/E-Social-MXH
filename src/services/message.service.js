const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Message, Conversation } = require('../models');
const { fileTypes } = require('../config/file');
const { fileService } = require('.');

const isUserInConversation = async (userId, conversationId) => {
  try {
    const conversation = await Conversation.findOne({
      _id: conversationId,
      members: {
        $in: [userId],
      },
    });
    if (!conversation) return false;
    return true;
  } catch (err) {
    return false;
  }
};
const createMessageText = async (userId, conversationId, text) => {
  const isIncludes = await isUserInConversation(userId, conversationId);
  if (!isIncludes) throw new ApiError(httpStatus.FORBIDDEN, 'You muss be in a conversation!');
  const newMessage = new Message({
    conversationId,
    sender: userId,
    typeMessage: fileTypes.TEXT,
    content: {
      text,
    },
  });
  try {
    const message = await newMessage.save();
    await Conversation.updateOne({ _id: conversationId }, { updatedAt: new Date() });
    return message;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const likeIcon = async (userId, conversationId) => {
  const isIncludes = await isUserInConversation(userId, conversationId);
  if (!isIncludes) throw new ApiError(httpStatus.FORBIDDEN, 'You muss be in a conversation!');
  const newMessage = new Message({
    conversationId,
    sender: userId,
    typeMessage: fileTypes.LIKE,
  });
  try {
    const message = await newMessage.save();
    await Conversation.updateOne({ _id: conversationId }, { updatedAt: new Date() });
    return message;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const loveIcon = async (userId, conversationId) => {
  const isIncludes = await isUserInConversation(userId, conversationId);
  if (!isIncludes) throw new ApiError(httpStatus.FORBIDDEN, 'You muss be in a conversation!');
  const newMessage = new Message({
    conversationId,
    sender: userId,
    typeMessage: fileTypes.LOVE,
  });
  try {
    const message = await newMessage.save();
    await Conversation.updateOne({ _id: conversationId }, { updatedAt: new Date() });
    return message;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const createMessageMedia = async (file, userId, conversationId, text) => {
  const isIncludes = await isUserInConversation(userId, conversationId);
  if (!isIncludes) throw new ApiError(httpStatus.FORBIDDEN, 'You muss be in a conversation!');
  const fileTypes = file.contentType.split('/')[0].toUpperCase();
  const newMessage = new Message({
    conversationId,
    sender: userId,
    typeMessage: fileTypes,
    content: {
      text,
      file: file.id,
    },
  });
  try {
    const message = await newMessage.save();
    await Conversation.updateOne({ _id: conversationId }, { updatedAt: new Date() });
    return message;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const getMessagesFromConversation = async (userId, conversationId, options) => {
  const isIncludes = await isUserInConversation(userId, conversationId);
  if (!isIncludes) throw new ApiError(httpStatus.FORBIDDEN, 'You muss be in a conversation!');
  try {
    const messages = await Message.paginate({ conversationId }, options);
    return messages;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const getLastMessageFromConversation = async (userId, conversationId) => {
  const isIncludes = await isUserInConversation(userId, conversationId);
  if (!isIncludes) throw new ApiError(httpStatus.FORBIDDEN, 'You muss be in a conversation!');
  try {
    const messages = await Message.findOne({
      conversationId,
    }).sort({ createdAt: -1 });
    const { content, createdAt } = messages;
    return { content, createdAt };
  } catch (err) {
    return '';
    // throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const recallMessagesFromConversation = async (userId, conversationId, messageId) => {
  const message = await Message.findById(messageId);
  if (!message) throw new ApiError(httpStatus.BAD_REQUEST, 'Not found');
  if (message.sender != userId) throw new ApiError(httpStatus.FORBIDDEN, 'Must be owner');
  if (message.typeMessage === 'RECALL') {
    await Message.deleteOne({ _id: messageId });
  }
  try {
    const newMessage = await Message.findByIdAndUpdate(
      messageId,
      { content: { text: '', file: '' }, typeMessage: 'RECALL' },
      { new: true, useFindAndModify: false }
    );
    if (message.content.file) await fileService.deleteFile(message.content.file);
    await Conversation.updateOne({ _id: conversationId }, { updatedAt: new Date() });
    return newMessage;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports = {
  createMessageText,
  recallMessagesFromConversation,
  getMessagesFromConversation,
  createMessageMedia,
  getLastMessageFromConversation,
  likeIcon,
  loveIcon,
};
