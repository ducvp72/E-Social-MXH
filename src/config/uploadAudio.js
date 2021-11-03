const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('./config');

const storage = new GridFsStorage({
    url: config.mongoose.url_audio,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'audios',
                };
                resolve(fileInfo);
            });
        });
    }
});
const uploadA = multer({
    storage,
    // limit the size to 20gb for any files coming in
    limits: { fileSize: 2000000000 },
    // filer out invalid filetypes

});

function checkAudioType(file, cb) {
    // https://youtu.be/9Qzmri1WaaE?t=1515
    // define a regex that includes the file types we accept
    const filetypes = /mp3|mpeg|mp4|wav|wma|aac/;
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
    uploadA
};