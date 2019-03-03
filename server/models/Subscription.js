const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  endpoint: String,
  expirationTime : String,
  keys : {p256dh : String, auth : String},
  _owner: { type: Schema.Types.ObjectId, ref: 'User' },
  test : {type: Boolean, default: false}
  });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
