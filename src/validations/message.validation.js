const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMessageText = {
  body: Joi.object().keys({
    conversationId: Joi.string().custom(objectId).required(),
    text: Joi.string().required(),
  }),
};
const getMessagesFromConversation = {
  params: Joi.object().keys({
    conversationId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createMessageText,
  getMessagesFromConversation,
};
