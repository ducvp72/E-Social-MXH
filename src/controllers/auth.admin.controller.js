const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, authAdminService, tokenService } = require('../services');

const login = catchAsync(async (req, res) => {
  const { adminName, password } = req.body;
  const user = await authAdminService.loginAdmin(adminName, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({
    user,
    tokens,
  });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).send();
});

const resetPasswordPage = catchAsync(async (req, res) => {
  await authAdminService.resetPasswordPage(req.user, req.body.oldPassword, req.body.password);
  res.status(httpStatus.OK).send();
});

module.exports = {
  login,
  logout,
  resetPasswordPage,
};
