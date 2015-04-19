var User = require('../models/user');
var passport = require('passport');
var fs = require('fs');
var uuid = require('node-uuid');

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

/**
 * Creates a new user.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

SessionController.prototype.create = function(req, res, next){
  var user = new User(req.body);
  var buffer = req.body.avatar.image.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
  var id = uuid.v4();
  user.lastUpdated = user.created = new Date();
  user.avatar.image = '/img/user/avatar/user-avatar-'+user.username+'-'+id+'.jpg';

  User.findOne({username: user.username}, function (err, results) {
      if (err) return next(err);
      if (results) {
          res.send('A user with this username already exists.', 400);
      }
      else {
          user.save(function (err, results) {
              if (err) return next(err);
              fs.writeFile('./img/user/avatar/user-avatar-'+user.username+'-'+id+'.jpg', buffer, 'base64', function(err) {
                if(err) {
                  console.log("err", err);
                }
              });
              return res.send(200);
          });
      }
  });
};

SessionController.prototype.logout = function(req, res) {

};

module.exports = SessionController;
