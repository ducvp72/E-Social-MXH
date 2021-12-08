const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getFile = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
module.exports = {
  getFile,
};
