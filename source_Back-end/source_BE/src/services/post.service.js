const httpStatus = require('http-status');
const { imageService, userService, fileService } = require('./index');
const notificationService = require('./notification.service');
const { Post, Comment, Follow, Notification } = require('../models');
const ApiError = require('../utils/ApiError');

const getUserFollowers = async (userId) => {
  let users;
  await Follow.findOne({
    user: userId,
  })
    .populate('followers', ['fullname'])
    .then((newFollow) => {
      if (newFollow) {
        users = newFollow.followers;
      }
    });
  return users;
};
const createPostT = async (user, text) => {
  const newPost = new Post({
    owner: user._id,
    text,
    fileTypes: 'TEXT',
  });
  const followers = await getUserFollowers(user._id);
  // eslint-disable-next-line no-restricted-syntax
  if(followers){
    for (const follower of followers) {
      const notif = `${user.fullname} posted 1 post text`;
      await notificationService.createNotification(follower._id, notif, user.id);
    }
  }
    let postN;
    await newPost
      .save()
      .then((post) => {
        postN = post;
      })
      .catch((err) => {
        throw new ApiError(httpStatus.BAD_REQUEST, err);
      });
  
  
  return postN;
};
const createPostFile = async (file, user, text) => {
  const fileTypes = file.contentType.split('/')[0].toUpperCase() || 'TEXT';
  const followers = await getUserFollowers(user._id);

  // eslint-disable-next-line no-restricted-syntax
  if(followers){
    for (const follower of followers) {
      const notif = `${user.fullname} posted 1 post media`;
      await notificationService.createNotification(follower._id, notif, user.id);
    }
  }
  
  const newPost = new Post({
    owner: user._id,
    text,
    fileTypes,
    file: file.id,
  });
  try {
    const post = await newPost.save();
    return post;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};
const like = async (user, id) => {
  let postR;
  const isLike = await hasLike(user, id);
  if (isLike) {
    await Post.updateOne({ _id: id }, { $pullAll: { likes: [user._id] } });
    await Post.findById(id).then((newPost) => {
      if (!newPost) throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
      postR = newPost;
    });
  } else {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          likes: user._id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    postR = post;
    if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    const notif = `${user.fullname} liked your post`;
    if (user.id !== post.owner) await notificationService.createNotification(post.owner, notif, user.id);
  }
  return postR;
};
const editTextForPost = async (userId, postId, text) => {
  const post = await Post.findOne({ _id: postId });
  if (!post) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  if (post.owner != userId) throw new ApiError(httpStatus.FORBIDDEN, 'Post must be edited by owner');
  try {
    const nPost = await Post.findByIdAndUpdate(postId, { text }, { new: true, useFindAndModify: false });
    return nPost;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};
const hasLike = async (userId, id) => {
  let isLike = true;
  await Post.findOne({
    _id: id,
    likes: { $in: userId },
  })
    .then((newPost) => {
      if (!newPost) isLike = false;
    })
    .catch((err) => {
      throw new ApiError(httpStatus.NOT_FOUND, err);
    });
  return isLike;
};
const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
};
const countPosts = async (userId) => {
  const user = await userService.existUserById(userId);
  let countR = 0;
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  await Post.countDocuments({ owner: userId })
    .exec()
    .then((count) => {
      if (!count) countR = 0;
      countR = count;
    });
  return countR;
};
const deletePostById = async (userId, postId) => {
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  if (post.owner != userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The post are only created by the owner');
  }
  if (post.fileTypes !== 'TEXT') await fileService.deleteFile(post.file);
  await Post.deleteOne({ _id: postId });
};
const countComments = async (postId) => {
  try {
    const commentCount = await Comment.countDocuments({ postId });
    return commentCount;
  } catch (err) {
    return 0;
  }
};
const countLikes = async (postId) => {
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  return post.likes.length;
};
const getPostById = async (postId) => {
  try {
    const post = await Post.findOne({ _id: postId });
    return post;
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
};
module.exports = {
  createPostFile,
  createPostT,
  like,
  hasLike,
  queryPosts,
  countPosts,
  deletePostById,
  countComments,
  countLikes,
  getPostById,
  editTextForPost,
};
