const { dateFunction } = require('../function');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[A-Z]/)) {
    return helpers.message('password must contain at least 1 uppercase letter and 1 number');
  }
  return value;
};
const birthday = (value, helper) => {
  if (dateFunction.getAge(value) < 13) {
    return helper.message('Age must be greater than  or equal to 13');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  birthday,
};
