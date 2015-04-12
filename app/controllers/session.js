var User = require('../models/user');
var passport = require('passport');

var SessionController = function(){};

SessionController.prototype.getCurrent = function(req, res, next) {
  if (!req.body) {
      res.send(400);
  }
  else {
      User.findOne({username: req.body.username}, function (err, results) {
          if (err) return next(err);
          if (results) {
              res.send({user: results});
          }
          else {
              res.send(400);
          }
      });
  }
};

SessionController.prototype.auth = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.json({user: user});
    });
  })(req, res, next);
};

SessionController.prototype.create = function(req, res, next){
  var user = new User(req.body);
  User.findOne({username: user.username}, function (err, results) {
      if (err) return next(err);
      if (results) {
          res.send('A user with this username already exists.', 400);
      }
      else {
          user.save(function (err, results) {
              if (err) return next(err);
              return res.send(200);
          });
      }
  });
};

SessionController.prototype.logout = function(req, res) {

};

module.exports = SessionController;
