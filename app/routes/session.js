// Session Create Route

var express = require('express');
var SessionController = require('../controllers/session');
var router = express.Router();
var session = new SessionController();

/**
 * Login to the service.
 *
 * endpoint: `api/signup`
 * method: GET
 *
 *
 *
 * @return {Object} The logged in user.
 * @api public
 */


router.post('/',function(req,res){

  session.getCurrent(req,res);

});

module.exports = router;
