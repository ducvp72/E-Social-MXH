const express = require('express');
const validate = require('../../middlewares/validate');
const authAdminValidation = require('../../validations/auth.admin.validation');
const authAdminController = require('../../controllers/auth.admin.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
router.post('/login', validate(authAdminValidation.login), authAdminController.login);
router.put(
  '/change-password',
  auth('manageUsers'),
  validate(authAdminValidation.changePassword),
  authAdminController.resetPasswordPage
);
// router.post('/logout', validate(authValidation.logout), authAdminController.logout);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authAdminController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/check-token', auth(''), authController.check_token);

module.exports = router;
