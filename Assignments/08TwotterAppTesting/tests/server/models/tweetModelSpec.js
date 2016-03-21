require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Tweet = require('./../../../models/tweetModel');

describe('Tweet Model', function() {
  it('should create a new tweet', function(done) {
    var currentdate = new Date(); 

    var tweet = new Tweet({  
      name: "tester",
      tweet: "test tweet",
      date: currentdate
    });
    tweet.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // What else can you test?

  it('should remove a cat by name', function(done) {
    Tweet.remove({ name: 'tester' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
