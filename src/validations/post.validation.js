const Joi = require('joi');
const { objectId } = require('./custom.validation');
const post = {
    body: Joi.object().keys({
        text: Joi.string().required(),
    }),
};
const like = {
    body: Joi.object().keys({
        postId: Joi.string().custom(objectId).required(),
    }),
};
comment = {
    body: Joi.object().keys({
        postId: Joi.string().custom(objectId).required(),
        text: Joi.string().required(),
    }),
};
const getPosts = {
    query: Joi.object().keys({
        owner: Joi.string().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};
const countPostsUser = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    })
}
module.exports = {
    post,
    like,
    comment,
    getPosts,
    countPostsUser,
};