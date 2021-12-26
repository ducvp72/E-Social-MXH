const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, postService, followService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fullname', 'email', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate', 'choose']);
  const result = await userService.queryUsers(filter, options);
  const results = [];
  const { page, limit, totalPages, totalResults } = result;
  // eslint-disable-next-line no-restricted-syntax
  for (const user of result.results) {
    const newUser = {};
    const { fullname, avatar, gender, birthday, email, createdAt, phone, isBlocked, isEmailVerified, id } = user;
    // eslint-disable-next-line no-await-in-loop
    const post = await postService.countPosts(id);
    // eslint-disable-next-line no-await-in-loop
    const followNumber = await followService.countFollow(user._id);
    const { followers, following } = followNumber;
    const reporters = 0;
    results.push(
      Object.assign(newUser, {
        id,
        fullname,
        email,
        phone,
        gender,
        avatar,
        birthday,
        reporters,
        isBlocked,
        isEmailVerified,
        post,
        followers,
        following,
        createdAt,
      })
    );
  }
  res.send({ results, page, limit, totalPages, totalResults });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
