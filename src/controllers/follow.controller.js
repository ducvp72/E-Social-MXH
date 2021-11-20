const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { followService } = require('../services');

const followingUser = catchAsync(async (req, res) => {
  const Follow = await followService.follow(req.user, req.body.followingId);
  res.status(httpStatus.OK).send(Follow);
});

module.exports = {
  followingUser,
};
