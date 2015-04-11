// User Routes
/* global req, res */

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Controller = require('../controllers/user');
var UserController = new Controller();

/**
 * Lists all users.
 *
 * endpoint: `api/user/`
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
 * endpoint: `/users/`
 * method: POST
 *
 * The following params should go in the request body.
 *
 * @param {String} firstName The new user's first name.
 * @param {String} lastName The new user's last name.
 * @param {String} username The new user's intended username.
 * @api public
 */

router.post('/',function(req,res){
  UserController.createUser(req,res);
});
/**
 * Fetchs a single user by id.
 * endpoint: `/users/:id`
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
 * endpoint: `/users/:id`
 * method: PUT
 *
 * The following params should go in request body.
 *
 * @param {String} firstName The new user's first name.
 * @param {String} lastName The new user's last name.
 * @param {String} username The new user's intended username.
 * @api public
 */

router.put('/:user_id',function(req,res){
  UserController.updateUser(req,res);
});
/**
 * Deletes a user by id.
 * endpoint: `/users/:id`
 * method: DELETE
 *
 * The following params should go in path.
 *
 * @param {String} id The user's id.
 * @api public
 */
router.delete('/:user_id',function(req,res){
  UserController.deleteUser(req,res);
});

/**
 * Finds a user by username.
 * endpoint: `/users/:id`
 * method: GET
 *
 * The following params should go in path.
 *
 * @param {String} username The user's username.
 * @api public
 */

router.get('/find/:username',function(req,res){
  UserController.findUserByUsername(req,res);
});

module.exports = router;
