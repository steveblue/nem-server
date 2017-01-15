var User = require('../models/user');
var passport = require('passport');
var fs = require('fs');


var SessionController = function(){};

SessionController.prototype.validate = function(req, res, next) {

  if( req.session.sid === req.cookies['connect.sid'] ) {
    res.status(200).send();
  } else {
    res.status(401).send('Unauthorized');
  }

};

SessionController.prototype.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { res.status(500).send(info.message); }
    if (!user) { res.status(401).send('Unauthorized'); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      req.session.sid = req.cookies['connect.sid'];
      res.cookie('connect.sid',req.cookies['connect.sid']);
      res.json(user);
    });
  })(req, res, next);
};



SessionController.prototype.logout = function(req, res) {
  if(req.user) {
    req.session.destroy(function (err) {
       res.status(200).send();
    });
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = SessionController;
