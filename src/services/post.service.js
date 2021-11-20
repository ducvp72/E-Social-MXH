const httpStatus = require('http-status');
const { imageService, userService } = require('./index');
const { imageTypes } = require('../config/image');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');
const commentService = require('./comment.service');

const createPostImage = async(file, user, text) => {
    imageService.uploadImage(file, user, imageTypes.POST);
    const newPost = new Post({
        owner: user._id,
        text,
        images: file.id,
    });
    let postN;
    await newPost
        .save()
        .then((post) => {
            postN = post;
        })
        .catch((err) => {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        });
    return postN;
};
const createPostAudio = async(file, user, text) => {
    imageService.uploadImage(file, user, imageTypes.POST);
    const newPost = new Post({
        owner: user._id,
        text,
        audio: file.id,
    });
    let postN;
    await newPost
        .save()
        .then((post) => {
            postN = post;
        })
        .catch((err) => {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        });
    return postN;
};
const createPostVideo = async(file, user, text) => {
    imageService.uploadImage(file, user, imageTypes.POST);
    const newPost = new Post({
        owner: user._id,
        text,
        video: file.id,
    });
    let postN;
    await newPost
        .save()
        .then((post) => {
            postN = post;
        })
        .catch((err) => {
            throw new ApiError(httpStatus.BAD_REQUEST, err);
        });
    return postN;
};
const like = async(user, id) => {
    let postR;
    const isLike = await hasLike(user, id);
    if (isLike) {
        await Post.updateOne({ _id: id }, { $pullAll: { likes: [user._id] } });
        await Post.findById(id).then((newPost) => {
            if (!newPost) throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
            postR = newPost;
        });
    } else {
        await Post.findByIdAndUpdate(
            id, {
                $push: {
                    likes: user._id,
                },
            }, { new: true, useFindAndModify: false }
        ).then((newPost) => {
            if (!newPost) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
            postR = newPost;
        });
    }
    return postR;
};

const hasLike = async(user, id) => {
    let isLike = true;
    await Post.findOne({
            _id: id,
            likes: { $in: user._id },
        })
        .then((newPost) => {
            if (!newPost) isLike = false;
        })
        .catch((err) => {
            throw new ApiError(httpStatus.NOT_FOUND, err);
        });
    return isLike;
};
const addComment = async(user, body) => {
    const comment = await commentService.createComment(user, body);
    if (!comment) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    let postR;
    await Post.findByIdAndUpdate(
        body.postId, {
            $push: {
                comments: comment._id,
            },
        }, { new: true, useFindAndModify: false }
    ).then((newPost) => {
        if (!newPost) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
        postR = newPost;
    });
    return postR;
};
const queryPosts = async(filter, options) => {
    const posts = await Post.paginate(filter, options);
    return posts;
};
const countPosts = async(userId) => {
    const user = await userService.existUserById(userId);
    let countR = 0;
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    await Post.countDocuments({ owner: userId })
        .exec()
        .then((count) => {
            if (!count) countR = 0;
            countR = count;
        });
    return countR;
};

module.exports = {
    createPostImage,
    createPostAudio,
    createPostVideo,
    like,
    hasLike,
    addComment,
    queryPosts,
    countPosts,
};
