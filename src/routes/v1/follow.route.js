const express = require('express');
const validate = require('../../middlewares/validate');
const { followValidation } = require('../../validations');
const followController = require('../../controllers/follow.controller');
const router = express.Router();
const auth = require('../../middlewares/auth');

router.put('/', auth(''), validate(followValidation.follow), followController.followingUser);

module.exports = router;
