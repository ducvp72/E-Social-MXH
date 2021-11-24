const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('./config');

const storage = new GridFsStorage({
  url: config.mongoose.url_file,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'file',
        };
        resolve(fileInfo);
      });
    });
  },
});
const uploadF = multer({
  storage,
  // limit the size to 500mb for any files coming in
  limits: { fileSize: 500000000 },
  // filer out invalid filetypes
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // define a regex that includes the file types we accept
  const filetypes = /jpeg|jpg|png|gif|mp3|mpeg|mp4|wav|wma|aacmp4|mov|wmv|avi|avchd|flv|mkv|webm/;

  // check the file extention
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // more importantly, check the mimetype
  const mimetype = filetypes.test(file.mimetype);
  // if both are good then continue
  if (mimetype && extname) return cb(null, true);
  // otherwise, return error message
  cb('filetype');
}

module.exports = {
  uploadF,
};
