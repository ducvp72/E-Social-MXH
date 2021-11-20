const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { imageService, profileService, postService, followService } = require('../services');

const { imageTypes } = require('../config/image');

const changeAvatar = catchAsync(async (req, res) => {
  const changeUAvatar = await imageService.uploadImage(req.file, req.user, imageTypes.AVATAR);
  res.status(httpStatus.OK).send(changeUAvatar);
});
const changeProfile = catchAsync(async (req, res) => {
  const newProfile = await profileService.updateProfile(req.user, req.body);
  res.status(httpStatus.OK).send(newProfile);
});
const findProfileById = catchAsync(async (req, res) => {
  const userProfile = await profileService.findProfileById(req.params.id);
  res.status(httpStatus.OK).send(userProfile);
});
const resetPassword = catchAsync(async (req, res) => {
  await profileService.resetPassword(req.user, req.body.oldPassword, req.body.password);
  res.status(httpStatus.OK).send();
});
const getSummary = catchAsync(async (req, res) => {
  const countPosts = await postService.countPosts(req.params.id);
  const countFollow = await followService.countFollow(req.params.id);
  res.status(httpStatus.OK).send({ countPosts, countFollow });
});

module.exports = {
  changeAvatar,
  changeProfile,
  findProfileById,
  resetPassword,
  getSummary,
};
