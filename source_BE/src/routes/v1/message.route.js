const express = require('express');
const { messageController } = require('../../controllers');
const { messageValidation } = require('../../validations');
const fileMiddleware = require('../../middlewares/fileMiddleware');

const router = express.Router();
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

router.post('/', auth(''), validate(messageValidation.createMessageText), messageController.createMessageText);
router.post('/like/:conversationId', auth(''), validate(messageValidation.createMessageIcon), messageController.likeIcon);
router.post('/love/:conversationId', auth(''), validate(messageValidation.createMessageIcon), messageController.loveIcon);
router.post('/media', auth(''), fileMiddleware.uploadFileForMessage, messageController.createMessageMedia);
router.get(
  '/:conversationId',
  auth(''),
  validate(messageValidation.getMessagesFromConversation),
  messageController.getMessagesFromConversation
);
router.put(
  '/',
  auth(''),
  validate(messageValidation.recallMessagesFromConversation),
  messageController.recallMessagesFromConversation
);

module.exports = router;
