// Session Create Route

var router = require('express').Router();
var Controller = require('../controllers/user');
var UserController = new Controller();



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


router.post('/', UserController.createUser);

module.exports = router;
