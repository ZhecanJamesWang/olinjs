var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
  name: String,
  tweet: String,
  date: Date
});

module.exports = mongoose.model('tweetSchema', tweetSchema);


