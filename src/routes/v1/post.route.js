const express = require('express');
const validate = require('../../middlewares/validate');
const { postValidation } = require('../../validations');
const postController = require('../../controllers/post.controller');
const router = express.Router();
const fileMiddleware = require('../../middlewares/fileMiddleware');
const auth = require('../../middlewares/auth');

router.post('/create-post-image', auth(''), fileMiddleware.uploadImageForPost, postController.createPostImage);
router.post('/create-post-audio', auth(''), fileMiddleware.uploadAudioForPost, postController.createPostAudio);
router.post('/create-post-video', auth(''), fileMiddleware.uploadVideoForPost, postController.createPostVideo);
router.put('/like', auth(''), validate(postValidation.like), postController.like);
router.post('/like', auth(''), validate(postValidation.like), postController.hasLike);
router.put('/comment', auth(''), validate(postValidation.comment), postController.comment);
router.get('/', validate(postValidation.getPosts), postController.getPosts);
module.exports = router;