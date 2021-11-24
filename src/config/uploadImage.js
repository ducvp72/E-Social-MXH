const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('./config');

const storage = new GridFsStorage({
    url: config.mongoose.url_image,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images',
                };
                resolve(fileInfo);
            });
        });
    }
});
const uploadE = multer({
    storage,
    // limit the size to 5mb for any files coming in
    limits: { fileSize: 5000000 },
    // filer out invalid filetypes
    fileFilter: function(req, file, cb) {
        checkImageType(file, cb);
    },
});

function checkImageType(file, cb) {
    // define a regex that includes the file types we accept
    const filetypes = /jpeg|jpg|png|gif/;
    //check the file extention
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // more importantly, check the mimetype
    const mimetype = filetypes.test(file.mimetype);
    // if both are good then continue
    if (mimetype && extname) return cb(null, true);
    // otherwise, return error message
    cb('filetype');
}




module.exports = {
    uploadE
};