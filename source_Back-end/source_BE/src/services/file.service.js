const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');

const config = require('../config/config');

let gfs;
const conn = mongoose.createConnection(config.mongoose.url_file, config.mongoose.options);

conn.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'files',
  });
  // gfs = Grid(conn.db, mongoose.mongo);
  // gfs.collection('uploads');
});
const deleteFile = async (id) => {
  if (!id || id === 'undefined') {
    throw new ApiError(httpStatus.NOT_FOUND, 'NOT_FOUND');
  }
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, (err) => {
    if (err) throw new ApiError(httpStatus.NOTFOUND, err);
  });
};
module.exports = {
   deleteFile,
};
