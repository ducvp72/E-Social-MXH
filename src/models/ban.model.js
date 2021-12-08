const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const banSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    des: {
      type: String,
      required: false,
      trim: true,
    },
    fileId: {
      required: true,
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
audioSchema.plugin(toJSON);
audioSchema.plugin(paginate);

/**
 * @typedef Image
 */
const Ban = mongoose.model('Ban', audioSchema);

module.exports = Ban;
