const path = require('path');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('./config');

const storage = new GridFsStorage({
  url: config.mongoose.url_file,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename,
        bucketName: 'files',
      };
      resolve(fileInfo);
    });
  },
});
const uploadF = multer({
  storage,
  // limit the size to 500mb for any files coming in
  limits: { fileSize: 500000000 },
  // filer out invalid filetypes
});

module.exports = {
  uploadF,
};
