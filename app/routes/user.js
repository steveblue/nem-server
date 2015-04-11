// User Routes

var express = require('express');
var router = express.Router();
var User = require('../models/user');


/**
 * Lists all users.
 *
 * endpoint: `api/users/`
 * method: GET
 *
 * NOTE: Will be refactored to only display online users.
 *
 * @return {Array} List of known users.
 * @api public
 */


router.get('/',function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
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

router.post('/',function(req, res) {

    var user = new User(); // create a new instance of the User model
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.lastUpdated = new Date();

    // save the user and check for errors
    user.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'User created! ' + JSON.stringify(user)
      });
    });

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

router.get('/:user_id',function(req, res) {

  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });

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

router.put('/:user_id',function(req, res) {

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
router.delete('/:user_id',function(req, res) {
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

router.get('/find/:username',function(req, res) {

  User.findOne({username: new RegExp('^'+req.params.username+'$', "i")}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });

});


module.exports = router;
