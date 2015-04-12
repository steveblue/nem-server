// Session Auth Route

var express = require('express');
var SessionController = require('../controllers/session');
var router = express.Router();

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


router.get('/',function(req,res){

  req.logout();
  res.send(200);

});

module.exports = router;
