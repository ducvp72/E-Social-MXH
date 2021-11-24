const httpStatus = require('http-status');
const { Follow, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

const follow = async (user, followingId) => {
  let followR;
  const existFollow = await userService.existUserById(followingId);
  if (!existFollow) throw new ApiError(httpStatus.NOT_FOUND, 'Not found  following');
  if (user._id == followingId) throw new ApiError(httpStatus.BAD_REQUEST, 'Can not follow yourself!');
  const isExitedUserFollow = await istExistedFollow(user.id);
  const istExistedFollowing = await istExistedFollow(followingId);
  if (!isExitedUserFollow) {
    const follow = new Follow({ user: user._id });
    await follow
      .save()
      .then((follow) => {})
      .catch((error) => {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Server error');
      });
  }
  if (!istExistedFollowing) {
    const followF = new Follow({ user: followingId });
    await followF
      .save()
      .then((follow) => {})
      .catch((error) => {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Server error');
      });
  }
  const isFollow = await hasFollow(user._id, followingId);
  if (isFollow) {
    await Follow.updateOne(
      { user: user._id },
      { $pullAll: { following: [followingId] } },
      { new: true, useFindAndModify: false }
    );
    await Follow.updateOne(
      { user: followingId },
      { $pullAll: { followers: [user._id] } },
      { new: true, useFindAndModify: false }
    );
    await Follow.findOne({ user: user._id }).then((newFollow) => {
      if (!newFollow) throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
      followR = newFollow;
    });
  } else {
    await Follow.findOneAndUpdate(
      { user: user._id },
      {
        $push: {
          following: followingId,
        },
      },
      { new: true, useFindAndModify: false }
    ).then((newFollow) => {
      if (!newFollow) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
      followR = newFollow;
    });
    await Follow.updateOne(
      { user: followingId },
      {
        $push: {
          followers: user._id,
        },
      },
      { new: true, useFindAndModify: false }
    ).then((newFollow) => {
      if (!newFollow) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    });
  }
  return followR;
};

const hasFollow = async (userId, followingId) => {
  let isFollow = true;
  await Follow.findOne({
    user: userId,
    following: { $in: followingId },
  })
    .then((newPost) => {
      if (!newPost) isFollow = false;
    })
    .catch((err) => {
      throw new ApiError(httpStatus.NOT_FOUND, err);
    });
  return isFollow;
};
const istExistedFollow = async (userId) => {
  let isExited = true;
  await Follow.findOne({
    user: userId,
  })
    .then((newFollow) => {
      if (!newFollow) isExited = false;
    })
    .catch((err) => {
      throw new ApiError(httpStatus.NOT_FOUND, err);
    });
  return isExited;
};
const countFollow = async (userId) => {
  const countFollowR = {
    followers: 0,
    following: 0,
  };
  await Follow.findOne({
    user: userId,
  }).then((newFollow) => {
    if (newFollow) {
      countFollowR.followers = newFollow.followers.length || 0;
      countFollowR.following = newFollow.following.length || 0;
    }
  });
  return countFollowR;
};
module.exports = {
  follow,
  hasFollow,
  istExistedFollow,
  countFollow,
};
