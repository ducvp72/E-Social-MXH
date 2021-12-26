const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { followService } = require('../services');
const { Follow } = require('../models');

const followingUser = catchAsync(async (req, res) => {
  const Follow = await followService.follow(req.user, req.body.followingId);
  res.status(httpStatus.OK).send(Follow);
});
const find = catchAsync(async (req, res) => {
  const follow = await Follow.findById(req.params.id).populate('user');
  res.status(httpStatus.OK).send(follow);
});

module.exports = {
  followingUser,
  find,
};
