// Session Auth Route

var express = require('express');
var SessionController = require('../controllers/session');
var router = express.Router();
var passport = require('passport');

/**
 * Login to the service.
 *
 * endpoint: `api/login`
 * method: GET
 *
 *
 *
 * @return {Object} The logged in user.
 * @api public
 */


router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.send(info.message); }
    if (!user) { return res.send(401); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.json({user: user});
    });
  })(req, res, next);
});

module.exports = router;
