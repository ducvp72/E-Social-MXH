const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMessageText = {
  body: Joi.object().keys({
    conversationId: Joi.string().custom(objectId).required(),
    text: Joi.string().required(),
  }),
};
const createMessageIcon = {
  params: Joi.object().keys({
    conversationId: Joi.string().custom(objectId).required(),
  }),
};
const getMessagesFromConversation = {
  params: Joi.object().keys({
    conversationId: Joi.string().custom(objectId).required(),
  }),
  query: Joi.object().keys({
    owner: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    populate: Joi.string(),
    typeMessage: Joi.string().valid('DOWNLOAD', 'VIDEO', 'AUDIO', 'IMAGE', 'MEDIA'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const recallMessagesFromConversation = {
  body: Joi.object().keys({
    conversationId: Joi.string().custom(objectId).required(),
    messageId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createMessageText,
  getMessagesFromConversation,
  recallMessagesFromConversation,
  createMessageIcon,
};
