const express = require('express');
const { messageController } = require('../../controllers');
const { messageValidation } = require('../../validations');

const router = express.Router();
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

router.post('/', auth(''), validate(messageValidation.createMessageText), messageController.createMessageText);
router.post('/media', auth(''), messageController.createMessageMedia);
router.get(
  '/',
  auth(''),
  validate(messageValidation.getMessagesFromConversation),
  messageController.getMessagesFromConversation
);

module.exports = router;
