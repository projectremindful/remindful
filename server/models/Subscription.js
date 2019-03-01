const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  endpoint: String,
  expirationTime : String,
  keys : {p256dh : String, auth : String},
  });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
