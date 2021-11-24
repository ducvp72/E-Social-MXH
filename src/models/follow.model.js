const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const followerSchema = new Schema({
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

followerSchema.plugin(toJSON);
followerSchema.plugin(paginate);
/**
 * @typedef Follow
 */
const Follow = mongoose.model('Follow', followerSchema);
module.exports = Follow;
