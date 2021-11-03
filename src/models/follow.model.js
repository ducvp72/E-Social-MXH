const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { Schema } = mongoose;

const followerSchema = new Schema({
    followers: [{ type: Schema.Types.ObjectId, rel: 'User' }],
    following: [{ type: Schema.Types.ObjectId, rel: 'User' }],
    user: { type: Schema.Types.ObjectId, rel: 'User' },
});

followerSchema.plugin(toJSON);
followerSchema.plugin(paginate);
/**
 * @typedef Follwers
 */
const Follow = mongoose.model('Follow', followerSchema);
module.exports = Follow;