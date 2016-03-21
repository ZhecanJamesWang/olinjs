var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should respond with the correct html on GET /', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('Content-Length', '2551', done); // ...or this way, inline!
  });

  
  it('user.name should be an case-insensitive match for "tobi"', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.name = res.body.name.toUpperCase();
      })
      .expect(200, {
        id: 'some fixed id',
        name: 'TOBI'
      }, done);
  });
  
  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });





});
