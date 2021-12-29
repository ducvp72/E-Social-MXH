const httpStatus = require('http-status');
const { Comment, Post } = require('../models');
const ApiError = require('../utils/ApiError');
const notificationService = require('./notification.service');

const wordFilter = require('../config/bad_words');

const createComment = async (user, postId, text) => {
  const post = await Post.findOne({ _id: postId });
  let cleanText;
  try{
    cleanText = wordFilter.clean(text);
  }catch(err){
    cleanText = text;
  }
  const newComment = new Comment({
    user: user.id,
    postId,
    text: cleanText,
  });
  const comment = await newComment.save();
  const notif = `${user.fullname} commented your post: ${text}`;
  if (user.id !== post.owner._id) await notificationService.createNotification(post.owner._id, notif,user.id);
  return comment;
};
const deleteComment = async (commentId) => {
  try {
    await Comment.deleteOne({ _id: commentId });
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  return comment;
};
const getComment = async (commentId) => {
  let commentN;
  await Comment.findById(commentId).then((comment) => {
    if (!comment) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'INVALID INPUT');
    }
    commentN = comment;
  });
  return commentN;
};
const likeC = async (user, id) => {
  let commentR;
  const isLike = await hasLikeC(user, id);
  if (isLike) {
    await Comment.updateOne({ _id: id }, { $pullAll: { likes: [user._id] } });
    await Comment.findById(id).then((newComment) => {
      if (!newComment) throw new ApiError(httpStatus.NOT_FOUND, err);
      commentR = newComment;
    });
  } else {
    await Comment.findByIdAndUpdate(
      id,
      {
        $push: {
          likes: user._id,
        },
      },
      { new: true, useFindAndModify: false }
    ).then((newComment) => {
      if (!newComment) throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
      commentR = newComment;
    });
  }
  return commentR;
};

const hasLikeC = async (user, id) => {
  let isLike = true;
  await Comment.findOne({
    _id: id,
    likes: { $in: user._id },
  })
    .then((newComment) => {
      if (!newComment) isLike = false;
    })
    .catch((err) => {
      throw new ApiError(httpStatus.NOT_FOUND, err);
    });
  return isLike;
};
const queryComment = async (filter, options) => {
  const comments = await Comment.paginate(filter, options);
  return comments;
};

module.exports = {
  createComment,
  getComment,
  likeC,
  hasLikeC,
  queryComment,
  deleteComment,
};
