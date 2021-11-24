const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const { videoController } = require('./index');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
let gfs;
const conn = mongoose.createConnection(config.mongoose.url_audio, config.mongoose.options);
conn.once('open', () => {
    // Init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'audios'
    });

});
const getAudio = catchAsync(async(req, res) => {
    let id = req.params.id;

    if (!id || id === 'undefined') {
        res.status(httpStatus.BAD_REQUEST, 'no image id');
    }
    const _id = new mongoose.Types.ObjectId(id);
    const range = req.headers.range;
    if (range) {
        gfs.find({ _id }).toArray((err, audio) => {
            const CHUNK_SIZE = 5 * 10 ** 5;
            try {
                if (!audio)
                    return res.status(httpStatus.BAD_REQUEST).send('no files exist');
                let start = Number(range.replace(/\D/g, ""));
                let end = Math.min(start + CHUNK_SIZE, audio[0].length - 1);
                let chunksize = end - start + 1;

                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${audio[0].length}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": audio[0].contentType,
                };

                // HTTP Status 206 for Partial Content
                res.writeHead(206, headers);
                gfs.openDownloadStream(_id, { start, end }).pipe(res);
            } catch {
                return res.status(httpStatus.BAD_REQUEST).send('no files exist');
            }
            // Finally pipe video to response


        });
    } else {
        gfs.find({ _id }).toArray((err, audio) => {
            try {
                const head = {
                    'Content-Length': audio[0].length,
                    'Content-Type': audio[0].contentType,
                };
                res.writeHead(200, head);
                gfs.openDownloadStream(_id).pipe(res);
            } catch {
                return res.status(httpStatus.BAD_REQUEST).send('no files exist');
            }



        });
    }

});

module.exports = {
    getAudio,
}