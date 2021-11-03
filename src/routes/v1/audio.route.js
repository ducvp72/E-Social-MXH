const express = require('express');
const { audioController } = require('../../controllers/');
const router = express.Router();
const imageMiddleware = require('../../middlewares/fileMiddleware');
const mongoose = require('mongoose');

router.get('/:id', audioController.getAudio);
// router.delete('/:id', audioController.deleteImage);

module.exports = router;