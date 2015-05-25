// Session Auth Route

var router = require('express').Router();
var Controller = require('../controllers/session');
var SessionController = new Controller();

/**
 * Login to the service.
 *
 * endpoint: `/login`
 * method: POST
 *
 * @param {String} username
 * @param {String} password
 *
 * @return {Object} The logged in user.
 * @api public
 */

 router.post('/', SessionController.login);

module.exports = router;
