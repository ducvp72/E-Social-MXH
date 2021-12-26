const Joi = require('joi').extend(require('@joi/date'));
const { password, birthday } = require('./custom.validation');

const login = {
  body: Joi.object().keys({
    adminName: Joi.string().required().min(5),
    password: Joi.string().required().custom(password),
  }),
};
const changePassword = {
  body: Joi.object().keys({
      oldPassword: Joi.string().required().custom(password),
      password: Joi.string().required().custom(password),
  }),
};
module.exports = {
  login,
  changePassword,
};
