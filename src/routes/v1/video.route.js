const express = require('express');
const { videoController } = require('../../controllers');
const router = express.Router();
const imageMiddleware = require('../../middlewares/fileMiddleware');
const mongoose = require('mongoose');

router.get('/:id', videoController.getVideo);


module.exports = router;