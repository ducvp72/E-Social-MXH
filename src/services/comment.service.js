const { imageService } = require('./index');
const { imageTypes } = require('../config/image');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');



const createComment = async(user, body) => {
    const newComment = new Comment({
        user: user._id,
        postId: body.postId,
        text: body.text,
    });
    let commentN;
    await newComment.save()
        .then((comment) => {
            commentN = comment;
        })
        .catch(err => { throw new ApiError(httpStatus.BAD_REQUEST, err) });
    return commentN;
}

module.exports = {
    createComment,
}