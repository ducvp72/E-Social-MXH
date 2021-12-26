const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, adminService } = require('../services');

const createAdmin = catchAsync(async (req, res) => {
  const admin = await adminService.createAdmin(req.body);
  res.status(httpStatus.CREATED).send(admin);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fullname', 'email', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
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

const toggleBlockUserById = catchAsync(async (req, res) => {
  const user = await adminService.toggleBlockById(req.params.userId);
  res.status(httpStatus.OK).send(user);
});
const deletePostUser =catchAsync(async (req, res) => {
  const user = await adminService.deletePostById(req.body.postId);
  res.status(httpStatus.OK).send(user);
})
module.exports = {
  createAdmin,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  toggleBlockUserById,
  deletePostUser,
};
