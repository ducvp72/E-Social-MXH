const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const post = {
    body: Joi.object().keys({
        text: Joi.string().required(),
    }),
};
const like = {
    body: Joi.object().keys({
        postId: Joi.objectId().required(),
    }),
};

module.exports = {
    post,
    like
};