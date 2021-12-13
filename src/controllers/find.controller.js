const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, followService, postService } = require('../services');

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fullname', 'email', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate', 'choose']);
  const result = await userService.queryUsers(filter, options);
  const results = [];
  const { page, limit, totalPages, totalResults } = result;
  // eslint-disable-next-line no-restricted-syntax
  for (const user of result.results) {
    const newUser = {};
    const { fullname, avatar, id } = user;
    const isFollow = await followService.hasFollow(req.user.id, id);
    const followNumber = await followService.countFollow(user._id);
    const { followers } = followNumber;
    results.push(Object.assign(newUser, { id, fullname, avatar, isFollow, followers }));
  }
  res.send({ results, page, limit, totalPages, totalResults });
});
const getInfoById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  const { fullname, avatar, id, story, facebook, phone, isBlocked, email } = user;
  const followNumber = await followService.countFollow(user._id);
  const posts = await postService.countPosts(id);
  const isFollow = await followService.hasFollow(req.user.id, id);
  // eslint-disable-next-line no-await-in-loop
  const { followers, following } = followNumber;
  const reporters = 0;
  res.send({
    id,
    fullname,
    email,
    avatar,
    isBlocked,
    story,
    facebook,
    phone,
    posts,
    isFollow,
    followers,
    following,
    reporters,
  });
});
module.exports = {
  getUsers,
  getInfoById,
};
