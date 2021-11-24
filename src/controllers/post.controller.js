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
const createPostText = catchAsync(async (req, res) => {
  const Post = await postService.createPostT(req.user, req.body.text);
  res.status(httpStatus.OK).send(Post);
});
const createPostFile = catchAsync(async (req, res) => {
  const Post = await postService.createPostFile(req.file,req.user, req.body.text);
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
  const Comment = await postService.addComment(req.user.id, req.body.postId, req.body.text);
  res.status(httpStatus.OK).send(Comment);
});
const likeComment = catchAsync(async (req, res) => {
  const Comment = await commentService.likeC(req.user, req.body.commentId);
  res.status(httpStatus.OK).send(Comment);
});
const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fullname', 'email', 'role']);
  req.query = { populate: 'owner' };
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate', 'choose']);
  const result = await postService.queryPosts(filter, options);
  const results = [];
  const { page, limit, totalPages, totalResults } = result;
  // eslint-disable-next-line no-restricted-syntax
  for (const post of result.results) {
    const newUser = {};
    const { id, images, video, audio, owner, text, createdAt } = post;
    // eslint-disable-next-line no-await-in-loop
    const {fullname, avatar} = owner;
    const userId = owner.id;
    const user ={userId, fullname,avatar};
    const comments = await postService.countComments(id);
    const likes = post.likes.length;
    // eslint-disable-next-line no-await-in-loop
    const reporters = 0;
    results.push(
      Object.assign(newUser, {
        id,
        user,
        text,
        images,
        video,
        audio,
        likes,
        comments,
        reporters,
        createdAt,
      })
    );
  }
  res.send({ results, page, limit, totalPages, totalResults });
});
const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req.user.id, req.body.postId);
  res.status(httpStatus.OK).send();
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
  deletePost,
  createPostText,
  createPostFile
};
