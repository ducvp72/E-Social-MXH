const httpStatus = require('http-status');
const mongoose = require('mongoose');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const { imageService } = require('../services');
const { Image } = require('../models');
const { imageTypes } = require('../config/image');
const config = require('../config/config');

let gfs;
const conn = mongoose.createConnection(config.mongoose.url_image, config.mongoose.options);
conn.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
});
const getImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  let weight = req.query.w;
  let height = req.query.h;
  if (!id || id === 'undefined') {
    res.status(httpStatus.BAD_REQUEST, 'No imges were found');
  }
  if (!weight) weight = 150;
  if (!height) height = 150;
  const _id = new mongoose.Types.ObjectId(id);

  gfs.find({ _id }).toArray((err, files) => {
    if (!files || files.length === 0) return res.status(httpStatus.BAD_REQUEST).send('no files exist');
    gfs.openDownloadStream(_id).pipe(sharp().resize(weight, height).jpeg()).pipe(res);
  });
});
const deleteImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  await imageService.deleteImage(id);
  res.status(httpStatus.OK).send();
});
module.exports = {
  getImage,
  deleteImage,
};
