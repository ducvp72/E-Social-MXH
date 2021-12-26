const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getFile = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  query:Joi.object().keys({
    w: Joi.number().integer(),
    h: Joi.number().integer(),
  }),
};
module.exports = {
  getFile,
};
