const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');

const updateProfile = async (user, userN) => {
  let userR;
  let phone;
  let facebook;
  let story;
  if (!userN.phone) phone = user.phone;
  else phone = userN.phone;
  if (!userN.facebook) facebook = user.facebook;
  else facebook = userN.facebook;
  if (!userN.story) story = user.story;
  else story = userN.story;

  await User.findByIdAndUpdate(
    user.id,
    {
      fullname: userN.fullname,
      birthday: userN.birthday,
      gender: userN.gender,
      phone,
      facebook,
      story,
    },
    { new: true, useFindAndModify: false }
  )
    .then((updatedUser) => {
      //  console.log(updatedUser);
      userR = updatedUser;
    })
    .catch((err) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    });
  return userR;
};
const findProfileById = async (id) => {
  let userR;
  await User.findById(id)
    .populate('follow')
    .then((user) => {
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
      userR = user;
    });
  return userR;
};
const resetPassword = async (user, oldPassword, newPassword) => {
  const userR = await userService.getUserById(user._id);
  if (!userR || !(await userR.isPasswordMatch(oldPassword))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
  }
  try {
    await userService.updateUserById(user._id, { password: newPassword }, { new: true, useFindAndModify: false });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};
module.exports = {
  updateProfile,
  findProfileById,
  resetPassword,
};
