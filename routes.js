// routes.js
// @description: Setup api routes.
// @authors: Steve Belovarich
// =============================================================================

module.exports = (function() {
    'use strict';

    var router = require('express').Router();
    // models
    var User = require('./app/models/user');

    // ROUTES
    // =========================================================================

    // middleware to use for all requests
    router.use(function(req, res, next) {
      //console.log(req);
      next(); // make sure we go to the next routes and don't stop here
    });

    // test route to make sure everything is working (accessed at GET http://localhost:5555/api)
    router.get('/', function(req, res) {
      res.json({
        message: 'api is online.'
      });
    });

    // more routes for our API will happen here

    // on routes that end in /users
    // ----------------------------------------------------
    router.route('/users')

    // create a user (accessed at POST http://localhost:5555/api/users)
    .post(function(req, res) {

        var user = new User(); // create a new instance of the User model
        user.firstName = req.body.firstName; // set the users name (comes from the request)
        user.lastName = req.body.lastName;
        user.username = req.body.username;

        // save the user and check for errors
        user.save(function(err) {
          if (err) {
            res.send(err);
          }
          res.json({
            message: 'User created! ' + JSON.stringify(req.body)
          });
        });

      })
      // get all the users (accessed at GET http://localhost:5555/api/users)
      .get(function(req, res) {

        User.find(function(err, users) {
          if (err) {
            res.send(err);
          } else {
            res.json(users);
          }
        });

      });

    router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:5555/api/users/:user_id)
    .get(function(req, res) {

        User.findById(req.params.user_id, function(err, user) {
          if (err) {
            res.send(err);
          } else {
            res.json(user);
          }
        });

      })
      // update the user with this id (accessed at PUT http://localhost:5555/api/users/:user_id)
      .put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

          if (err) {
            res.send(err);
          }

          user.firstName = req.body.firstName; // update the users info

          // save the user
          user.save(function(err) {
            if (err) {
              res.send(err);
            }

            res.json({
              message: 'User updated!'
            });
          });

        });
      })
      .delete(function(req, res) {
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

    return router;

})();
