const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService, postService } = require('../services');
const pick = require('../utils/pick');

const likeComment = catchAsync(async (req, res) => {
  const Comment = await commentService.likeC(req.user, req.body.commentId);
  res.status(httpStatus.OK).send(Comment);
});
const getComments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['postId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'user';
  const result = await commentService.queryComment(filter, options);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  likeComment,
  getComments,
};
