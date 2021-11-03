const Joi = require('joi').extend(require('@joi/date'));
const { password, objectId } = require('./custom.validation');
const { dateFunction } = require('../function');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        fullname: Joi.string().required().min(5).max(30),
        birthday: Joi.date().format("DD/MM/YYYY").raw().required().custom((value, helper) => {
            if (dateFunction.getAge(value) < 13) {
                return helper.message("Age must be greater than  or equal to 13")
            } else {
                return true;
            }
        }),
        gender: Joi.string().required().valid('male', 'female', 'other'),
        role: Joi.string().required().valid('user', 'admin'),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            name: Joi.string(),
        })
        .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};