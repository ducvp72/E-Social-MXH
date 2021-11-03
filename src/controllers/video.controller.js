const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
var GridStore = require('mongodb').GridStore;
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
let gfs;
const conn = mongoose.createConnection(config.mongoose.url_video, config.mongoose.options);
conn.once('open', () => {
    // Init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'videos'
    });

});
const getVideo = catchAsync(async(req, res) => {
    let id = req.params.id;

    if (!id || id === 'undefined') {
        res.status(httpStatus.BAD_REQUEST, 'no image id');
    }
    const _id = new mongoose.Types.ObjectId(id);
    const range = req.headers.range;

    if (range) {
        gfs.find({ _id }).toArray((err, video) => {
            try {

                const CHUNK_SIZE = 10 ** 6 + video[0].chunkSize;
                let start = Number(range.replace(/\D/g, ""));
                let end = Math.min(start + CHUNK_SIZE, video[0].length - 1);

                let chunksize = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${video[0].length}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": video[0].contentType,
                };
                res.writeHead(206, headers);
                gfs.openDownloadStream(_id, { start, end }).pipe(res);


            } catch {
                res.status(httpStatus.BAD_REQUEST).send('no files exist');
            }

        });
    } else {
        gfs.find({ _id }).toArray((err, video) => {
            try {
                const head = {
                    'Content-Length': video[0].length,
                    'Content-Type': video[0].contentType,
                };
                res.writeHead(206, head);
                gfs.openDownloadStream(_id, 0, video[0].length - 1).pipe(res);
            } catch {
                res.status(httpStatus.BAD_REQUEST).send('no files exist');
            }
        });
    }

});

module.exports = {
    getVideo,
}