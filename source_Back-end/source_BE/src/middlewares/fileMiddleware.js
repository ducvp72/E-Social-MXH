const multer = require('multer');
const httpStatus = require('http-status');
const { uploadE } = require('../config/uploadImage');
const { uploadA } = require('../config/uploadAudio');
const { uploadV } = require('../config/uploadVideo');
const { uploadF } = require('../config/uploadFile');

const uploadImage = (req, res, next) => {
  const uploadS = uploadE.single('file');
  uploadS(req, res, function (err) {
    if (!req.user) res.status(httpStatus.UNAUTHORIZED).send('Please authenticate');
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    }
    if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('Image files only');
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    if (!req.file) return res.status(400).send('File not valid');
    // all good, proceed
    next();
  });
};
const uploadImageForPost = (req, res, next) => {
  const uploadS = uploadE.single('file');
  uploadS(req, res, function (err) {
    if (!req.body.text) return res.status(400).send('text is null');
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    }
    if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('Image files only');
      // An unknown error occurred when uploading.
      return res.status(500);
    }
    if (!req.file) return res.status(400).send('File not valid');
    // all good, proceed
    next();
  });
};
const uploadAudioForPost = (req, res, next) => {
  const uploadSA = uploadA.single('file');
  uploadSA(req, res, function (err) {
    if (!req.body.text) return res.status(400).send('text is null');
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    }
    if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('Audio files only');
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    if (!req.file) return res.status(400).send('File not valid');
    // all good, proceed
    next();
  });
};
const uploadVideoForPost = (req, res, next) => {
  const uploadSV = uploadV.single('file');
  uploadSV(req, res, function (err) {
    if (!req.user) res.status(httpStatus.UNAUTHORIZED).send('Please authenticate');
    if (!req.body.text) return res.status(400).send('text is null');

    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    }
    if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('Video files only');
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    if (!req.file) return res.status(400).send('File not valid');

    // all good, proceed
    next();
  });
};
const uploadFileForPost = (req, res, next) => {
  const uploadSV = uploadF.single('file');
  uploadSV(req, res, function (err) {
    if (!req.user) res.status(httpStatus.UNAUTHORIZED).send('Please authenticate');
    if (!req.body.text) return res.status(400).send('text is null');

    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    }
    if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('File is invalid');
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    if (!req.file) return res.status(400).send('File not valid');

    // all good, proceed
    next();
  });
};
const uploadFileForMessage = (req, res, next) => {
  const uploadSV = uploadF.single('file');
  uploadSV(req, res, function (err) {
    if (!req.user) res.status(httpStatus.UNAUTHORIZED).send('Please authenticate');
    if (!req.body.conversationId) return res.status(400).send('conversationId is required');
    // if (!req.body.con) return res.status(400).send('text is null');
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    }
    if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('File is invalid');
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    if (!req.file) return res.status(400).send('File not valid');

    // all good, proceed
    next();
  });
};
const uploadFile = (req, res, next) => {
  const uploadSV = uploadF.single('file');
  uploadSV(req, res, function (err) {
    // if (!req.body.con) return res.status(400).send('text is null');
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    }
    if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('File is invalid');
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    if (!req.file) return res.status(400).send('File not valid');

    // all good, proceed
    next();
  });
};

module.exports = {
  uploadImage,
  uploadAudioForPost,
  uploadVideoForPost,
  uploadImageForPost,
  uploadFileForPost,
  uploadFileForMessage,
  uploadFile
};
