const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { imageService, profileService, userService } = require('../services');
const { imageTypes } = require('../config/image');

const changeAvatar = catchAsync(async(req, res) => {
    const changeUAvatar = await imageService.uploadImage(req.file, req.user, imageTypes.AVATAR);
    res.status(httpStatus.OK).send(changeUAvatar);
});
const changeProfile = catchAsync(async(req, res) => {
    const newProfile = await profileService.updateProfile(req.user, req.body);
    res.status(httpStatus.OK).send(newProfile);
});
const findProfileById = catchAsync(async(req, res) => {
    let userProfile = await profileService.findProfileById(req.params.id);
    res.status(httpStatus.OK).send(userProfile);
});

module.exports = {
    changeAvatar,
    changeProfile,
    findProfileById,
};