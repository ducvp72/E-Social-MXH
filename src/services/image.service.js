const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');
const { User, Image } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'images'
    });
    // gfs = Grid(conn.db, mongoose.mongo);
    // gfs.collection('uploads');
});
const uploadImage = async(file, user, imageTypes) => {
    let newImage = new Image({
        name: file.filename,
        des: file.originalname,
        imageTypes,
        fileId: file.id,
    });
    let userN;
    newImage.save()
        .then((image) => {})
        .catch(err => { throw new ApiError(httpStatus.BAD_REQUEST, err) });

    await User.findByIdAndUpdate(
            user._id, {
                avatar: file.id,
                $push: {
                    previousAvatar: user.avatar,
                }
            }, { new: true, useFindAndModify: false }
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
const deleteImage = (id) => {
    if (!id || id === 'undefined') {
        throw new ApiError(httpStatus.NOT_FOUND, 'NOT_FOUND');
    };
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
        if (err) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    });
};



module.exports = {
    uploadImage,
    deleteImage,

};