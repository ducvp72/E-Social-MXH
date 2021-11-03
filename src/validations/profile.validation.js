const Joi = require('joi').extend(require('@joi/date')).extend(require('joi-phone-number'));
const { dateFunction } = require('../function');
Joi.objectId = require('joi-objectid')(Joi);


const changeProfile = {
    body: Joi.object().keys({
        fullname: Joi.string().required().min(5).max(30),
        birthday: Joi.date().format("DD/MM/YYYY").raw().required().custom((value, helper) => {
            if (dateFunction.getAge(value) < 13) {
                return helper.message("Age must be greater than  or equal to 13")
            } else {
                return true;
            }
        }),
        gender: Joi.string().required().valid('male', 'female', 'other'),
        phone: Joi.string().phoneNumber({ defaultCountry: 'VN', format: 'international' }),
        facebook: Joi.string().uri(),
        story: Joi.string().max(150),

    }),
};
const findProfileById = {
    params: Joi.object().keys({
        id: Joi.objectId().required(),
    })
}
module.exports = {
    changeProfile,
    findProfileById,
};