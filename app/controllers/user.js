var User = require('../models/user.js');
var fs = require('fs');

var UserController = function(){};

/**
 * Lists all users.
 *
 *
 * TODO: Refactor to only display online users.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.fetchUsers = function(req,res){
  if (req.user) {
    User.find(function(err, users) {
      if (err) {
        return res.send(err);
      } else {
        return res.json(users);
      }
    });
  } else {
    res.send(401);
  }

};

/**
 * Fetch a single user by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.fetchUser = function(req,res){
  if (req.user) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }
  else {
    res.send(401);
  }
};


/**
 * Updates a user by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */


UserController.prototype.updateUser = function(req,res){
  if (req.user) {
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
  }else{
    res.send(401);
  }
};


/**
 * Updates a user's avatar by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */


UserController.prototype.updateUserAvatar = function(req,res){

  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  }

  if (req.user) {

  User.findById(req.params._id, function(err, user) {

    if (err) {
      res.send(err);
    }
    var id = uuid.v4();
    var buffer = decodeBase64Image(res.body.image);

    user.avatar.image = '/img/user/avatar/user-avatar-'+user.username+'-'+id+'.jpg';
    user.lastUpdated = new Date();

    // save the user
    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      fs.writeFile('./img/user/avatar/user-avatar-'+user.username+'-'+id+'.jpg', buffer, 'base64', function(err) {
        if(err) {
          console.log("err", err);
        }
      });

      res.json({
        message: 'User avatar updated!',
        details: JSON.stringify(user),
        request: JSON.stringify(req.body)
      });

    });

  });
  }else{
    res.send(401);
  }
};


/**
 * Deletes a user by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.deleteUser = function(req,res){
    //if(req.passport.user === req.params.user_id){
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
    //}
};

/**
 * Finds a user by username.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.findUserByUsername = function(req,res){
  if(req.user){
    User.findOne({username: new RegExp('^'+req.params.username+'$', "i")}, function(err, user) {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }else{
    res.send(401);
  }
};

module.exports = UserController;
