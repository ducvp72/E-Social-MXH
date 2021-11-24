const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getUser = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
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
  }),
};
module.exports = {
  getUser,
  createPrivate,
  createGroup,
  addMemberToGroup,
};
