const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Message, Conversation } = require('../models');
const { fileTypes } = require('../config/file');

const createMessageText = async (user, conversationId, text) => {
  const newMessage = new Message({
    conversationId,
    sender: user.id,
    typeMessage: fileTypes.TEXT,
    content: text,
  });
  try {
    const message = await newMessage.save();
    return message;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const isUserInConversation = async (userId, conversationId) => {
  try {
    await Conversation.find({
      _id: conversationId,
      members: {
        $in: [userId],
      },
    });
    return true;
  } catch (err) {
    return false;
  }
};
const getMessagesFromConversation = async (user, conversationId) => {
  const isIncludes = isUserInConversation(user.id, conversationId);
  if (!isIncludes) throw new ApiError(httpStatus.FORBIDDEN, 'You muss be in a conversation!');
  try {
    const messages = await Message.find({
      conversationId,
    });
    return messages;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports = {
  createMessageText,
  getMessagesFromConversation,
};
