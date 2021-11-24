const httpStatus = require('http-status');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

const createInitComment = async () => {
  const newComment = new Comment({});
  const comment = await newComment.save();
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
  createInitComment,
  getComment,
  likeC,
  hasLikeC,
  queryComment,
};
