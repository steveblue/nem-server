var User = require('../models/user.js');

var UserController = function(){};

/**
 * Lists all users.
 *
 *
 * NOTE: Will be refactored to only display online users.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.fetchUsers = function(req,res){
  User.find(function(err, users) {
    if (err) {
      return res.send(err);
    } else {
      return res.json(users);
    }
  });
};

/**
 * Fetch a single user by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.fetchUser = function(req,res){
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

/**
 * Creates a new user.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.createUser = function(req,res){
  var user = new User(); // create a new instance of the User model
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.username = req.body.username;
  user.lastUpdated = user.created = new Date();

  // save the user and check for errors
  user.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'User created! ' + JSON.stringify(user)
    });
  });
};


/**
 * Updates a user by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */


UserController.prototype.updateUser = function(req,res){
  User.findById(req.params.user_id, function(err, user) {

    if (err) {
      res.send(err);
    }

    if (req.body.firstName) {
      user.firstName = req.body.firstName; // update the users first name
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName; // update the users first name
    }
    if (req.body.username) {
      // do nothing
    }

    user.lastUpdated = new Date();

    // save the user
    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'User updated!',
        details: JSON.stringify(user),
        request: JSON.stringify(req.body)
      });
    });

  });
};

/**
 * Deletes a user by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.deleteUser = function(req,res){
  User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'Successfully deleted'
    });
  });
};

/**
 * Finds a user by username.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.findUserByUsername = function(req,res){
  User.findOne({username: new RegExp('^'+req.params.username+'$', "i")}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

module.exports = UserController;
