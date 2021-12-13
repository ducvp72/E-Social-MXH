const httpStatus = require('http-status');
const { Admin, User, Post } = require('../models');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createAdmin = async (userBody) => {
  if (await Admin.isNameTaken(userBody.adminName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'AdminName already taken');
  }
  return Admin.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  // name: { $regex: searchString, $options: 'i' }

  const { email } = filter;
  const { fullname } = filter;
  if (email) {
    filter.email = { $regex: email || '', $options: 'i' };
  }
  if (fullname) {
    filter.fullname = { $regex: fullname || '', $options: 'i' };
  }

  // if(fullname)
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getAdminById = async (id) => {
  return Admin.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getAdminByName = async (adminName) => {
  return Admin.findOne({ adminName });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const toggleBlockById = async (userId) => {
  const user = await User.findById(userId);
  if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'Not found user');
  const isBlock = await isBlocked(userId);
  if (!isBlock) {
   return await blockUserById(userId);
  } else {
   return  await unBlockUserById(userId);
  }
};
const blockUserById = async (userId) => {
  await userService.updateUserById(userId, { isBlocked: true }).then((user) => {
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    r = user;
  });
  return r;
};
const unBlockUserById = async (userId) => {
  await userService.updateUserById(userId, { isBlocked: false }).then((user) => {
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
    }
    r = user;
  });
  return r;
};
const isBlocked = async (userId) => {
  let istBlocked = true;
  await User.findOne({
    _id: userId,
  })
    .then((user) => {
      if (!user.isBlocked) istBlocked = false;
    })
    .catch((err) => {
      throw new ApiError(httpStatus.NOT_FOUND, err);
    });
  return istBlocked;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const existUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    return false;
  }
  return true;
};
const updateAdminById = async (userId, updateBody) => {
  const user = await getAdminById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
const deletePostById = async (postId)=>{
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await Post.deleteOne({ _id: postId });
}

module.exports = {
  createAdmin,
  queryUsers,
  getAdminById,
  getAdminByName,
  blockUserById,
  deleteUserById,
  existUserById,
  toggleBlockById,
  unBlockUserById,
  updateAdminById,
  deletePostById,
};
