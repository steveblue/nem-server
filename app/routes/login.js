// User Routes

var express = require('express');
var user = require('../models/user');
var accountController = require('../controllers/account');
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


router.get('/',function(req, res) {

});

module.exports = router;
