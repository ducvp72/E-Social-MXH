const Joi = require('joi');
const { objectId } = require('./custom.validation');

const follow = {
    body: Joi.object().keys({
        followingId: Joi.string().custom(objectId).required(),
    }),
};


module.exports = {
    follow,
}