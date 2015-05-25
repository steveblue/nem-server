// ===========================================================================
// server.js
// @description: Setup server, register routes and swagger, start up express server.
// @authors: Steve Belovarich
// ===========================================================================

// packages
var express = require('express'); // call express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;


// app vars
var app = express(); // define our app using express

var config = require('./config');
var User = require('./app/models/user');
var port = config.originPort || process.env.PORT; // set our port

// =========================================================================
// MongoDB Config
// =========================================================================

mongoose.connect('mongodb://'+config.mongo+':'+config.mongoPort); // connect to our database

// =========================================================================
// Express Config
// =========================================================================

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  genid: function(req) {
    return uuid.v4(); // use UUIDs for session IDs
  },
  secret: 'your-secret-key',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 600000 }
}));
app.use(bodyParser.urlencoded({extended: true}));


// =========================================================================
// Passport Config
// =========================================================================


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));


// =========================================================================
// Load Modules
// =========================================================================

var routes = require('./router')(app,passport);

// =========================================================================
// Server Start
// =========================================================================

app.listen(port);
console.log('Express available at '+config.origin+':'+config.originPort);
console.log('MongoDB available at '+config.mongo+':'+config.mongoPort);
module.exports = app;
