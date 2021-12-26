const express = require('express');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const { findController, adminController } = require('../../controllers');

const router = express.Router();
const auth = require('../../middlewares/auth');

router.get('/', auth(''), validate(userValidation.searchUser), findController.getUsers);

router.get('/user', validate(userValidation.searchUser), adminController.getUsers);

router.get('/user/:userId', auth(''),validate(userValidation.getUser), findController.getInfoById);
module.exports = router;
