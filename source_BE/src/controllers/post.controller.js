const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { postService, commentService, followService } = require('../services');

const wordFilter = require('../config/bad_words');

const createPostText = catchAsync(async (req, res) => {
  const Post = await postService.createPostT(req.user, req.body.text);
  res.status(httpStatus.OK).send(Post);
});
const createPostFile = catchAsync(async (req, res) => {
  const Post = await postService.createPostFile(req.file, req.user, req.body.text);
  res.status(httpStatus.OK).send(Post);
});
const editTextForPost = catchAsync(async (req, res) => {
  const Post = await postService.editTextForPost(req.user.id, req.body.postId, req.body.text);
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
  const Comment = await commentService.createComment(req.user, req.body.postId, req.body.text);
  res.status(httpStatus.OK).send(Comment);
});
const likeComment = catchAsync(async (req, res) => {
  const Comment = await commentService.likeC(req.user, req.body.commentId);
  res.status(httpStatus.OK).send(Comment);
});
const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['owner']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate', 'choose']);
  options.populate = 'owner';
  const result = await postService.queryPosts(filter, options);

  const results = [];
  const { page, limit, totalPages, totalResults } = result;
  // eslint-disable-next-line no-restricted-syntax
  for (const post of result.results) {
    const newUser = {};
    const { id, file, owner, fileTypes, text, createdAt } = post;
    let cleanText;
    try{
      cleanText = wordFilter.clean(text);
    }catch(err){
      cleanText = text;
    }
   
    if (!owner) continue;
    // eslint-disable-next-line no-await-in-loop
    const { fullname, avatar } = owner;
    const userId = owner.id;
    const user = {
      userId,
      fullname,
      avatar,
    };
    const hasLike = await postService.hasLike(req.user.id, id);
    const comments = await postService.countComments(id);
    const likes = post.likes.length;
    // eslint-disable-next-line no-await-in-loop
    const reporters = 0;
    results.push(
      Object.assign(newUser, {
        id,
        user,
        text: cleanText,
        file,
        fileTypes,
        likes,
        hasLike,
        comments,
        reporters,
        createdAt,
      })
    );
  }
  res.send({
    results,
    page,
    limit,
    totalPages,
    totalResults,
  });
});
const getMyPosts = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'owner';
  const usersHasFollowed = (await followService.getUserFollowing(req.user.id)) || [];
  usersHasFollowed.push(req.user.id);
  const result = await postService.queryPosts(
    {
      owner: {
        $in: usersHasFollowed,
      },
    },
    options
  );
  const results = [];
  const { page, limit, totalPages, totalResults } = result;
  // eslint-disable-next-line no-restricted-syntax
  for (const post of result.results) {
    const newUser = {};
    const { id, file, owner, fileTypes, text, createdAt } = post;
    // eslint-disable-next-line no-await-in-loop
    let cleanText;
    try{
      cleanText = wordFilter.clean(text);
    }catch(err){
      cleanText = text;
    }
    const { fullname, avatar } = owner;
    const userId = owner.id;
    const user = {
      userId,
      fullname,
      avatar,
    };
    const hasLike = await postService.hasLike(req.user.id, id);
    const comments = await postService.countComments(id);
    const likes = post.likes.length;
    // eslint-disable-next-line no-await-in-loop
    const reporters = 0;
    results.push(
      Object.assign(newUser, {
        id,
        user,
        text: cleanText,
        file,
        fileTypes,
        hasLike,
        likes,
        comments,
        reporters,
        createdAt,
      })
    );
  }
  res.send({
    results,
    page,
    limit,
    totalPages,
    totalResults,
  });
});
const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req.user.id, req.body.postId);
  res.status(httpStatus.OK).send();
});
module.exports = {
  like,
  hasLike,
  comment,
  likeComment,
  getPosts,
  deletePost,
  createPostText,
  createPostFile,
  getMyPosts,
  editTextForPost,
};
