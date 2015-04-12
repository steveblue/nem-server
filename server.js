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
app.use(bodyParser.urlencoded({extended: true}));

// Provide some basic error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

app.use(session({ secret: config.key, resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

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

var routes = require('./router')(app);


// =========================================================================
// Server Start
// =========================================================================

app.listen(port);
console.log('Express available at '+config.origin+':'+config.originPort);
console.log('MongoDB available at '+config.mongo+':'+config.mongoPort);
module.exports = app;
