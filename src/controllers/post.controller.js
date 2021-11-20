const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { postService, commentService } = require('../services');

const createPostImage = catchAsync(async (req, res) => {
  const Post = await postService.createPostImage(req.file, req.user, req.body.text);
  res.status(httpStatus.OK).send(Post);
});
const createPostAudio = catchAsync(async (req, res) => {
  const Post = await postService.createPostAudio(req.file, req.user, req.body.text);
  res.status(httpStatus.OK).send(Post);
});
const createPostVideo = catchAsync(async (req, res) => {
  const Post = await postService.createPostVideo(req.file, req.user, req.body.text);
  res.status(httpStatus.OK).send(Post);
});
const like = catchAsync(async (req, res) => {
  const Post = await postService.like(req.user, req.body.postId);
  res.status(httpStatus.OK).send(Post);
});
const hasLike = catchAsync(async (req, res) => {
  const Post = await postService.hasLike(req.user, req.body.postId);
  res.status(httpStatus.OK).send(Post);
});
const comment = catchAsync(async (req, res) => {
  const Comment = await postService.addComment(req.user, req.body);
  res.status(httpStatus.OK).send(Comment);
});
const likeComment = catchAsync(async (req, res) => {
  const Comment = await commentService.likeC(req.user, req.body.commentId);
  res.status(httpStatus.OK).send(Comment);
});
const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['owner']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.queryPosts(filter, options);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createPostImage,
  createPostVideo,
  createPostAudio,
  like,
  hasLike,
  comment,
  likeComment,
  getPosts,
};
