const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { User, Image } = require('../models');
const ApiError = require('../utils/ApiError');

const config = require('../config/config');

let gfs;
const conn = mongoose.createConnection(config.mongoose.url_image, config.mongoose.options);

conn.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
  // gfs = Grid(conn.db, mongoose.mongo);
  // gfs.collection('uploads');
});
const deleteImage = async (id) => {
  if (!id || id === 'undefined') {
    throw new ApiError(httpStatus.NOT_FOUND, 'NOT_FOUND');
  }
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, (err) => {
    if (err) throw new ApiError(httpStatus.NOTFOUND, err);
  });
};
const uploadImage = async (file, user, imageTypes) => {
  const newImage = new Image({
    name: file.filename,
    des: file.originalname,
    imageTypes,
    fileId: file.id,
  });
  let userN;
  newImage
    .save()
    .then((image) => {})
    .catch((err) => {
      throw new ApiError(httpStatus.BAD_REQUEST, err);
    });
  await Image.deleteOne({ _id: user.avatar });
  if (user.avatar !== '61a86e9b7b73519cfa85890b') await deleteImage(user.avatar);
  await User.findByIdAndUpdate(
    user._id,
    {
      avatar: file.id,
    },
    { new: true, useFindAndModify: false }
  )
    .then((updatedUser) => {
      //  console.log(updatedUser);
      userN = updatedUser;
    })
    .catch((err) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    });

  return userN;
};


module.exports = {
  uploadImage,
  deleteImage,
};
