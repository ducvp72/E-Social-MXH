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
