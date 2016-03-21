var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs  = require("express-handlebars");
var index = require("./routes/index");
var app = express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var auth = require('./auth');

var PORT = 3000;
var mongoose = require('mongoose');
/* CONNECT TO MONGOOSE */
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test');


passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
     index.addUsers(profile.displayName);

    //This is not what you want to do here. 
    //Here you should search the connected DB if the user exists and load that in, or add it to db. 
    done(null, profile);
  }
));

app.use(session({ secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("addUsers", index.addUsers)
app.get("/", index.getInfo);

app.get("/login", index.login);

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});



app.post("/addTweet", index.addTweet);
app.post("/delTweet", index.delTweet);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' })
);


app.get('/user', ensureAuthenticated, function(req, res) {
  res.send(req.user);
})


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
    res.send(401);
}

// exphbs.registerHelper('ifCond', function(v1, v2, options){
//   if(v1===v2){
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });


app.listen(PORT, function() {
  console.log("App running on port:", PORT);
});

module.exports = app;
