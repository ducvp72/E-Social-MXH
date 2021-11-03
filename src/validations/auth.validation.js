const Joi = require('joi').extend(require('@joi/date'));
const { password } = require('./custom.validation');
const { parse } = require('date-format-parse');
const { dateFunction } = require('../function');
const register = {
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
    }),

};

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};

const resetPassword = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
    body: Joi.object().keys({
        password: Joi.string().required().custom(password),
    }),
};

const verifyEmail = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
};

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    verifyEmail,
};