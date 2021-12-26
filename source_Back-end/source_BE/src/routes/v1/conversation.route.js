const express = require('express');
const { conversationController } = require('../../controllers');
const { conversationValidation } = require('../../validations');

const router = express.Router();
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

router.get('/', auth(''), validate(conversationValidation.getUser), conversationController.getUser);
router.post(
  '/private',
  auth(''),
  validate(conversationValidation.createPrivate),
  conversationController.getPrivateConversation
);
router.post('/create-group', auth(''), validate(conversationValidation.createGroup), conversationController.createGroup);
router.put(
  '/add-member',
  auth(''),
  validate(conversationValidation.addMemberToGroup),
  conversationController.addMemberToGroup
);
router.put('/out-group', auth(''), validate(conversationValidation.outGroup), conversationController.outGroup);

module.exports = router;
