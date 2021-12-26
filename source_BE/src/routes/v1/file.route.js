const express = require('express');
const { fileController } = require('../../controllers');

const router = express.Router();
const validate = require('../../middlewares/validate');
const { fileValidation } = require('../../validations');

router.get('/:id', validate(fileValidation.getFile), fileController.getFiles);

module.exports = router;
