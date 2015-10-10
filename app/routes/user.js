// User Routes

var router = require('express').Router();
var User = require('../models/user');
var Controller = require('../controllers/user');
var Session = require('../controllers/session');
var UserController = new Controller();
var SessionController = new Session();

/**
 * Lists all users.
 *
 * endpoint: `/user`
 * method: GET
 *
 * NOTE: Will be refactored to only display online users.
 *
 * @return {Array} List of known users.
 * @api public
 */


router.get('/',function(req,res){
  UserController.fetchUsers(req,res);
});

/**
 * Creates a new user.
 * endpoint: `/user`
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
    UserController.createUser(req,res);
});

/**
 * Fetchs a single user by id.
 * endpoint: `/user/:id`
 * method: GET
 *
 * The following params should go in path.
 *
 * @param {String} id The user's id.
 * @api public
 */

router.get('/:user_id',function(req,res){
  UserController.fetchUser(req,res);
});

/**
 * Updates a user by id.
 * endpoint: `/user/:id`
 * method: PUT
 *
 * The following params should go in request body.
 *
 * @param {String} firstName The new user's first name.
 * @param {String} lastName The new user's last name.
 * @param {String} username The new user's intended username.
 * @param {String} email The new user's email address.
 * @param {Object} avatar Contains one parameter (image) that expects a base64 image.
 * @api public
 */

router.put('/:user_id', UserController.updateUser);
/**
 * Deletes a user by id.
 * endpoint: `/user/:id`
 * method: DELETE
 *
 * The following params should go in path.
 *
 * @param {String} id The user's id.
 * @api public
 */
router.delete('/:user_id', UserController.deleteUser);

/**
 * Finds a user by username.
 * endpoint: `/user/:id`
 * method: GET
 *
 * The following params should go in path.
 *
 * @param {String} username The user's username.
 * @api public
 */

router.get('/find/:username',UserController.findUserByUsername);

module.exports = router;
