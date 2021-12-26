const express = require('express');
const validate = require('../../middlewares/validate');
const { postValidation } = require('../../validations');
const postController = require('../../controllers/post.controller');

const router = express.Router();
const fileMiddleware = require('../../middlewares/fileMiddleware');
const auth = require('../../middlewares/auth');

router.post('/create-post-file', auth(''), fileMiddleware.uploadFileForPost, postController.createPostFile);
router.post('/create-post-text', auth(''), validate(postValidation.createPostText), postController.createPostText);
router.put('/like', auth(''), validate(postValidation.like), postController.like);
router.post('/like', auth(''), validate(postValidation.like), postController.hasLike);
router.put('/comment', auth(''), validate(postValidation.comment), postController.comment);
router.get('/', auth(''), validate(postValidation.getPosts), postController.getPosts);
router.get('/get-my-post', auth(''), validate(postValidation.getPosts), postController.getMyPosts);
router.delete('/', auth(''), validate(postValidation.deletePost), postController.deletePost);
router.put('/', auth(''), validate(postValidation.editTextForPost), postController.editTextForPost);
module.exports = router;
