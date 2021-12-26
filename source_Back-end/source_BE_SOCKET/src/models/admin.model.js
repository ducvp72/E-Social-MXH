const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const genderTypes = require('../config/gender');
const config = require('../config/config');

const adminShema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: [genderTypes.MALE, genderTypes.FEMALE, genderTypes.OTHER],
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
    avatar: {
      type: String,
      default: '619628b9793b0c809f103df0',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
adminShema.plugin(toJSON);
adminShema.plugin(paginate);

/**
 * Check if password matches the admin's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
adminShema.methods.isPasswordMatch = async function (password) {
  const admin = this;
  return bcrypt.compare(password, admin.password);
};

adminShema.pre('save', async function (next) {
  const admin = this;
  if (admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});
/**
 * Check if adminName is taken
 * @param {string} adminName - The user nickname
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
adminShema.statics.isNameTaken = async function (adminName, excludeUserId) {
  const admin = await this.findOne({ adminName, _id: { $ne: excludeUserId } });
  return !!admin;
};
/**
/**
 * @typedef Admin
 */
const Admin = mongoose.model('Admin', adminShema);

module.exports = Admin;
