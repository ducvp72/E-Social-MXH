const Joi = require('joi').extend(require('@joi/date')).extend(require('joi-phone-number'));
const { objectId, password, birthday } = require('./custom.validation');


const changeProfile = {
    body: Joi.object().keys({
        fullname: Joi.string().required().min(5).max(30),
        birthday: Joi.date().format("DD/MM/YYYY").raw().required().custom(birthday),
        gender: Joi.string().required().valid('male', 'female', 'other'),
        phone: Joi.string().phoneNumber({ defaultCountry: 'VN', format: 'international' }),
        facebook: Joi.string().uri(),
        story: Joi.string().max(150),

    }),
};
const findProfileById = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId).required(),
    })
}
const resetPassword = {
    body: Joi.object().keys({
        oldPassword: Joi.string().required().custom(password),
        password: Joi.string().required().custom(password),
    }),
};
const getSummary = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId),
    }),
}
module.exports = {
    changeProfile,
    findProfileById,
    resetPassword,
    getSummary,
};