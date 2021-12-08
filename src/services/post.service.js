const httpStatus = require('http-status');
const { imageService, userService, fileService } = require('./index');
const { imageTypes } = require('../config/file');
const { Post, Comment, File } = require('../models');
const ApiError = require('../utils/ApiError');
const commentService = require('./comment.service');

const createPostImage = async (file, user, text) => {
  imageService.uploadImage(file, user, imageTypes.POST);
  const comment = await commentService.createInitComment();
  const newPost = new Post({
    owner: user._id,
    text,
    images: file.id,
    comment: comment.id,
  });
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
const createPostAudio = async (file, user, text) => {
  imageService.uploadImage(file, user, imageTypes.POST);
  const comment = await commentService.createInitComment();
  const newPost = new Post({
    owner: user._id,
    text,
    audio: file.id,
    comment: comment.id,
  });
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
const createPostVideo = async (file, user, text) => {
  imageService.uploadImage(file, user, imageTypes.POST);
  const comment = await commentService.createInitComment();
  const newPost = new Post({
    owner: user._id,
    text,
    video: file.id,
    comment: comment.id,
  });
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
const createPostT = async (user, text) => {
  const newPost = new Post({
    owner: user._id,
    text,
    fileTypes: 'TEXT',
  });
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
    await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          likes: user._id,
        },
      },
      { new: true, useFindAndModify: false }
    ).then((newPost) => {
      if (!newPost) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
      postR = newPost;
    });
  }
  return postR;
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
  await fileService.deleteFile(post.file);
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
  createPostImage,
  createPostAudio,
  createPostVideo,
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
};
