const Joi = require('joi').extend(require('@joi/date'));
const { password, objectId } = require('./custom.validation');

const createAdmin = {
  body: Joi.object().keys({
    adminName: Joi.string().required().min(5),
    password: Joi.string().required().custom(password),
    gender: Joi.string().required().valid('male', 'female', 'other'),
  }),
};
const blockUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};
module.exports = {
  createAdmin,
  blockUser,
};
