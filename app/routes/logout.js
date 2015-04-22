// Session Auth Route

var express = require('express');
var SessionController = require('../controllers/session');
var router = express.Router();

/**
 * Logout of the service.
 *
 * endpoint: `/logout`
 * method: POST
 *
 *
 *
 * @return {Integer} 200.
 * @api public
 */


router.post('/',function(req,res){

  req.logout();
  res.send(200);

});

module.exports = router;
