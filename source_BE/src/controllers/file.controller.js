const httpStatus = require('http-status');
const mongoose = require('mongoose');
const sharp = require('sharp');
const GridFs = require('gridfs-stream');

eval(`GridFs.prototype.findOne = ${GridFs.prototype.findOne.toString().replace('nextObject', 'next')}`);
const GifEncoder = require('gif-encoder');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');

let gfs;
const conn = mongoose.createConnection(config.mongoose.url_file, config.mongoose.options);
conn.once('open', () => {
  // Init stream
  gfs = GridFs(conn.db, mongoose.mongo);
  gfs.collection('files');
});
const getFiles = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { w, h } = req.query;
  if (!id || id === 'undefined') {
    res.status(httpStatus.BAD_REQUEST, 'No imges were found');
  }
  const _id = new mongoose.Types.ObjectId(id);

  gfs.findOne({ _id }, (err, files) => {
    if (err) res.send(err);
    if (!files || files.length === 0) return res.status(httpStatus.BAD_REQUEST).send('no files exist');
    const fileTypes = files.contentType.split('/')[0].toUpperCase();
    if (fileTypes === 'IMAGE') {
      if (files.contentType === 'image/gif') {
        const gif = new GifEncoder(w, h);
        gif.pipe(gfs.createReadStream(_id)).pipe(res);
      } else {
        gfs
          .createReadStream(_id)
          .pipe(sharp().resize({ width: w, height: h, fit: sharp.fit.inside }).png())
          .pipe(res);
      }
    } else if (fileTypes === 'AUDIO' || fileTypes === 'VIDEO') {
      const { range } = req.headers;
      const { length } = files;
      const CHUNK_SIZE = 10 ** 6;
      const startChunk = Number((range || '').replace(/bytes=/, '').split('-')[0]);

      const endChunk = Math.min(startChunk + CHUNK_SIZE, length - 1);
      const chunkSize = endChunk - startChunk + 1;

      res.set({
        'Content-Range': `bytes ${startChunk}-${endChunk}/${length}`,
        'Content-Length': chunkSize,
        'Content-Type': files.contentType,
        'Accept-Ranges': 'bytes',
      });

      res.status(206);

      const fileReadStream = gfs.createReadStream({
        _id,
        range: {
          startPos: startChunk,
          endPos: endChunk,
        },
      });

      fileReadStream.on('open', () => fileReadStream.pipe(res));

      fileReadStream.on('end', () => res.end());
    } else {
      const { length } = files;
      if (files.contentType === 'application/pdf') {
        res.set({
          'Content-Length': length,
          'Content-Type': files.contentType,
          'Content-Transfer-Encoding': 'binary',
          'Accept-Ranges': 'bytes',
        });
      } else
        res.set({
          'Content-Length': length,
          'Content-Disposition': `attachment; filename=${files.filename}`,
          'Content-Type': files.contentType,
          'Content-Transfer-Encoding': 'binary',
          'Accept-Ranges': 'bytes',
        });
      gfs.createReadStream(_id).pipe(res);
    }
  });
});
module.exports = {
  getFiles,
};
