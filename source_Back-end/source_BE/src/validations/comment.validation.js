const Joi = require('joi');
const { objectId } = require('./custom.validation');

const like = {
    body: Joi.object().keys({
        commentId: Joi.string().custom(objectId).required(),
    }),
};
const getComments = {
    query: Joi.object().keys({
        postId: Joi.string().custom(objectId).required(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

module.exports = {
    like,
    getComments,
};
