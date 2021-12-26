const express = require('express');
const { notificationController } = require('../../controllers');

const router = express.Router();
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

router.get('/', auth(''), notificationController.getNotification);
router.delete('/', auth(''), notificationController.deleteNotification);

module.exports = router;
