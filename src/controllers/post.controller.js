const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');



const createPostImage = catchAsync(async(req, res) => {
    const Post = await postService.createPostImage(req.file, req.user, req.body.text);
    res.status(httpStatus.OK).send(Post);
});
const createPostAudio = catchAsync(async(req, res) => {
    const Post = await postService.createPostAudio(req.file, req.user, req.body.text);
    res.status(httpStatus.OK).send(Post);
});
const createPostVideo = catchAsync(async(req, res) => {
    const Post = await postService.createPostVideo(req.file, req.user, req.body.text);
    res.status(httpStatus.OK).send(Post);
});
const like = catchAsync(async(req, res) => {
    const Post = await postService.like(req.user, req.body.postId);
    res.status(httpStatus.OK).send(Post);
});
const hasLike = catchAsync(async(req, res) => {
    const Post = await postService.hasLike(req.user, req.body.postId);
    res.status(httpStatus.OK).send(Post);
});

module.exports = {
    createPostImage,
    createPostVideo,
    createPostAudio,
    like,
    hasLike,
}