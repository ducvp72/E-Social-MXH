const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { files } = require('../config/file');

const fileSchema = mongoose.Schema(
  {
    fileTypes: {
      type: String,
      enum: files,
      required: true,
    },
    fileId: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fileSchema.plugin(toJSON);
fileSchema.plugin(paginate);

/**
 * @typedef File
 */
const File = mongoose.model('File', fileSchema);

module.exports = File;
