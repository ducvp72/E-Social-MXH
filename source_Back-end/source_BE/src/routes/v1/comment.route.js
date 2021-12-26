const express = require('express');
const validate = require('../../middlewares/validate');
const { commentValidation } = require('../../validations');
const commentController = require('../../controllers/comment.controller');
const router = express.Router();
const auth = require('../../middlewares/auth');



router.put('/like', auth(''), validate(commentValidation.like), commentController.likeComment);
router.get('/', validate(commentValidation.getComments), commentController.getComments);

module.exports = router;