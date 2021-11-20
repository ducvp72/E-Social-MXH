const express = require('express');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const { userController } = require('../../controllers');
const router = express.Router();
const auth = require('../../middlewares/auth');



router.get('/', validate(userValidation.searchUser), userController.getUsers);


module.exports = router;