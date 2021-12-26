const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getUser = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
  }),
};

const createPrivate = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};
const createGroup = {
  body: Joi.object().keys({
    groupUserId: Joi.array().items(Joi.string().custom(objectId).required()),
  }),
};
const addMemberToGroup = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    conversationId: Joi.string().custom(objectId).required(),
  }),
};
const outGroup = {
  body: Joi.object().keys({
    conversationId: Joi.string().custom(objectId).required(),
  }),
};
module.exports = {
  getUser,
  createPrivate,
  createGroup,
  addMemberToGroup,
  outGroup,
};
