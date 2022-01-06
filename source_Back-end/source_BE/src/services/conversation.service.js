const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Conversation } = require('../models');

const getUser = async (userId, options) => {
  try {
    const conversation = await Conversation.paginate(userId, options);
    return conversation;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, err);
  }
};
const getConversationByUCId = async (userId, conversationId) => {
  try {
    const conversation = await Conversation.findOne({
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
  const conversation = await Conversation.findOne({
    members: {
      $all: [userId, peopleId],
    },
  }).populate('members', ['avatar', 'fullname']);

  if (!conversation)  throw new ApiError(httpStatus.BAD_REQUEST, 'Conversation has been created');
  if (userId == peopleId) throw new ApiError(httpStatus.BAD_REQUEST, 'Conversation can be not created with myself');
  const { members, id, conversationType } = conversation;
  const senderr = members.filter((member) => member.id == userId);
  const user = senderr[0];
  const ret = { id, conversationType, user };
  return ret;
};
const createPrivate = async (senderId, receiverId) => {
  if (senderId == receiverId) throw new ApiError(httpStatus.BAD_REQUEST, 'Conversation can be not created with myself');
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
const addMemberToGroup = async (userId, peopleId, conversationId) => {
  try {
    const conversation = await getConversationByUCId(userId, conversationId);
    if (conversation.members.includes(userId) || conversation.members.includes(peopleId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User has already been added to conversation');
    }
    if (conversation.conversationType !== 'group') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Private conversation is not allowed to add');
    }
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found or not in group');
  }

  let conversationR;
  await Conversation.findByIdAndUpdate(
    conversationId,
    { $push: { members: userId } },
    { new: true, useFindAndModify: false }
  ).then((conversationN) => {
    if (!conversationN) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');

    conversationR = conversationN;
  });
  return conversationR;
};
const outGroup = async (userId, conversationId) => {
  const conversation = await getConversationByUCId(userId, conversationId);
  if (!conversation) throw new ApiError(httpStatus.NOT_FOUND, 'Not found or not in group');
  if (conversation.conversationType !== 'group') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Private conversation is not allowed to out');
  }

  try {
    const conversationR = await Conversation.findByIdAndUpdate(
      conversationId,
      { $pullAll: { members: [userId] } },
      { new: true, useFindAndModify: false }
    );
    return conversationR;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
module.exports = {
  getUser,
  createPrivate,
  createGroup,
  addMemberToGroup,
  getPrivate,
  outGroup,
};
