const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
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

  let { email } = filter;
  let { fullname } = filter;
  if (email == '') email = ' ';
  if (fullname == '') fullname = ' ';
  if (email) {
    filter.email = { $regex: email, $options: 'i' };
  }
  if (fullname) {
  
    filter.fullname = { $regex: fullname || ' ', $options: 'i' };
  }
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
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
const searchUserByName = async (searchString, options) => {
  let userR;
  if (!searchString) {
    await User.find({}, 'name')
      .limit(options.limit)
      .sort({ name: options.sortBy == 'desc' ? -1 : 1 })
      .then((user) => {
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        userR = user;
      });
  } else {
    await User.find(
      {
        name: { $regex: searchString, $options: 'i' },
      },
      'name'
    )
      .limit(options.limit)
      .sort({ name: options.sortBy == 'desc' ? -1 : 1 })
      .then((user) => {
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        userR = user;
      });
  }
  return { userR, count: userR.length };
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  existUserById,
  searchUserByName,
};
