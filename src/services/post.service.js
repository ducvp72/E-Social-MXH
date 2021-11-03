const { imageService, commentService } = require('./');
const { imageTypes } = require('../config/image');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const createPostImage = async(file, user, text) => {
    imageService.uploadImage(file, user, imageTypes.POST);
    let newPost = new Post({
        owner: user._id,
        text,
        images: file.id,
    });
    let postN;
    await newPost.save()
        .then((post) => {
            postN = post;
        })
        .catch(err => { throw new ApiError(httpStatus.BAD_REQUEST, err) });
    return postN;
};
const createPostAudio = async(file, user, text) => {
    imageService.uploadImage(file, user, imageTypes.POST);
    let newPost = new Post({
        owner: user._id,
        text,
        audio: file.id,
    });
    let postN;
    await newPost.save()
        .then((post) => {
            postN = post;
        })
        .catch(err => { throw new ApiError(httpStatus.BAD_REQUEST, err) });
    return postN;
};
const createPostVideo = async(file, user, text) => {
    imageService.uploadImage(file, user, imageTypes.POST);
    let newPost = new Post({
        owner: user._id,
        text,
        video: file.id,
    });
    let postN;
    await newPost.save()
        .then((post) => {
            postN = post;
        })
        .catch(err => { throw new ApiError(httpStatus.BAD_REQUEST, err) });
    return postN;
};
const like = async(user, id) => {
    let postR;
    const isLike = await hasLike(user, id);
    if (isLike) {
        await Post.updateOne({ _id: id }, { $pullAll: { likes: [user._id] } });
        await Post.findById(id).then(newPost => {
            postR = newPost;
        }).catch(err => { throw new ApiError(httpStatus.NOT_FOUND, err) });
    } else {
        await Post.findByIdAndUpdate(id, {
            $push: {
                likes: user._id,
            }
        }, { new: true, useFindAndModify: false }).then(newPost => {
            if (!newPost) throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
            postR = newPost;
        });

    }
    return postR;
}

const hasLike = async(user, id) => {
    let isLike = true;
    await Post.findOne({
        _id: id,
        likes: { $in: user._id }
    }).then(newPost => {
        if (!newPost) isLike = false;
    }).catch(err => { throw new ApiError(httpStatus.NOT_FOUND, err) });
    return isLike;
}
const addComment = async(user, body) => {
    const comment = await commentService.createComment(user, body);
    let postR;
    await Post.findByIdAndUpdate(user._id, {
        $push: {
            comment: comment._id,
        }
    }, { new: true, useFindAndModify: false }).then(newPost => {
        if (!newPost) throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
        postR = newPost;
    });
    return postR;
}

module.exports = {
    createPostImage,
    createPostAudio,
    createPostVideo,
    like,
    hasLike,
    addComment,
}