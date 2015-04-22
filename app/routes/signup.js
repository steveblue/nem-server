// Session Create Route

var express = require('express');
var SessionController = require('../controllers/session');
var router = express.Router();
var session = new SessionController();


/**
 * Creates a new user.
 * endpoint: `/signup`
 * method: POST
 *
 * The following params should go in the request body.
 *
 * @param {String} firstName The new user's first name.
 * @param {String} lastName The new user's last name.
 * @param {String} username The new user's intended username.
 * @param {String} password The new user's password.
 * @param {String} email The new user's email address.
 * @param {Object} avatar Contains one parameter (image) that expects a base64 image.
 * @api public
 */


router.post('/',function(req,res,next){

  session.create(req,res,next);

});

module.exports = router;
