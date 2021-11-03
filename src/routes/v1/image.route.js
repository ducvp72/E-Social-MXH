const express = require('express');
const imageController = require('../../controllers/image.controller');
const router = express.Router();
const imageMiddleware = require('../../middlewares/fileMiddleware');
const mongoose = require('mongoose');

router.get('/:id', imageController.getImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;