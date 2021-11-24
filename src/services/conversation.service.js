const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Conversation } = require('../models');

const getUser = async (userId, conversationId) => {
  try {
    const conversation = await Conversation.find({
      _id: conversationId,
      members: {
        $in: [userId],
      },
    });
    return conversation;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, err);
  }
};
const getPrivate = async (userId, peopleId) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $all: [userId, peopleId],
      },
    });
    return conversation;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, err);
  }
};
const createPrivate = async (senderId, receiverId) => {
  const isCreated = await getPrivate(senderId, receiverId);
  if (isCreated) throw new ApiError(httpStatus.BAD_REQUEST, 'Conversation has been  created');
  const newConversation = new Conversation({
    members: [senderId, receiverId],
    conversationType: 'private',
  });
  try {
    const conversation = await newConversation.save();
    return conversation;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const createGroup = async (userId, groupUserId) => {
  groupUserId.push(userId);
  const newConversation = new Conversation({
    members: groupUserId,
    conversationType: 'group',
  });
  try {
    const conversation = await newConversation.save();
    return conversation;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const addMemberToGroup = async (userId, conversationId) => {
  const conversation = await Conversation.findByIdAndUpdate(
    conversationId,
    { $push: { members: userId } },
    { new: true, useFindAndModify: false }
  ).then((conversationN) => {
    if (!conversationN) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    if (conversationN.conversationType !== 'group') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Private conversation is not allowed to add');
    }
  });
  return conversation;
};
module.exports = {
  getUser,
  createPrivate,
  createGroup,
  addMemberToGroup,
  getPrivate,
};
