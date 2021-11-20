const express = require('express');
const validate = require('../../middlewares/validate');
const { adminValidation } = require('../../validations');
const adminController = require('../../controllers/admin.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
router.post('/createAdmin', auth('manageUsers'), validate(adminValidation.createAdmin), adminController.createAdmin);
router.put(
  '/blockUser/:userId',
  auth('manageUsers'),
  validate(adminValidation.blockUser),
  adminController.toggleBlockUserById
);

module.exports = router;
