const Joi = require('joi').extend(require('@joi/date'));
const { password, objectId, birthday } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        fullname: Joi.string().required().min(5).max(30),
        birthday: Joi.date().format("DD/MM/YYYY").raw().required().custom(birthday),
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
const searchUser = {
    query: Joi.object().keys({
        fullname: Joi.string().allow(''),
        role: Joi.string(),
        email:Joi.string().allow(''),
        page:Joi.number().integer(),
        choose: Joi.string(),
        sortBy: Joi.string(),
        populate: Joi.string(),
        limit: Joi.number().integer(),
    }),
}
const searchByKeyword = {
  query: Joi.object().keys({
      keyword: Joi.string().allow(''),
      sortBy: Joi.string(),
      populate: Joi.string(),
      limit: Joi.number().integer(),
  }),
}
module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    searchUser,
    searchByKeyword,
};