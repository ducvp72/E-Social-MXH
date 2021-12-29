const express = require('express');
const { fileController } = require('../../controllers');

const router = express.Router();
const validate = require('../../middlewares/validate');
const { fileValidation } = require('../../validations');
// const fileMiddleware = require('../../middlewares/fileMiddleware');

router.get('/:id', validate(fileValidation.getFile), fileController.getFiles);
// router.post('', fileMiddleware.uploadFile,(req,res)=>{
//   res.send(req.file);
// });
module.exports = router;
