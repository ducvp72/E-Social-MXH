const express = require('express');
const imageController = require('../../controllers/image.controller');

const router = express.Router();
const validate = require('../../middlewares/validate');
const { imageValidation } = require('../../validations');

router.get('/:id', validate(imageValidation.getImage), imageController.getImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;
