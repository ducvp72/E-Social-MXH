const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;
  // const userIsVerified = user.isEmailVerified;
  // if (userIsVerified === false) {
  //   return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please verify'));
  // }
  const userIsBlocked = user.isBlocked;
  if (userIsBlocked === true) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'You have been blocked by Admin'));
  }
  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.trim().includes(userRights);
    if (!hasRequiredRights && req.params.userId !== user.id && user.role === 'user') {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      {
        session: false,
      },
      verifyCallback(req, resolve, reject, requiredRights)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
