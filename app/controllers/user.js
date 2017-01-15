var User = require('../models/user');
var fs = require('fs');
var uuid = require('uuid');

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

UserController.prototype.fetchUsers = function(req,res,next){
  if (req.user) {

    User.find(function(err, users) {
      if (err) {
        return next(err);
      } else {
        return res.json(users);
      }
    });

  } else {
    res.status(401).send();
  }

};

/**
 * Fetch a single user by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */

UserController.prototype.fetchUser = function(req,res,next){
  if (req.user) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        return next(err);
      } else {
        console.log(user);
        res.status(200).json(user);
      }
    });
  }
  else {
    res.status(401).send();
  }
};


UserController.prototype.createUser = function(req, res, next){

  var user = new User(req.body);
  var id = uuid.v4();
  user.lastUpdated = user.created = new Date();
  user.customer = {};

  if(req.body.avatar){
    user.avatar.image = '/img/user/avatar/user-avatar-'+user.username+'-'+id+'.jpg';
  }

  User.findOne({username: user.username}, function (err, results) {
      if (err) return next(err);
      if (results) {
          res.status(500).send('A user with this username already exists.');
      }
      else {

          user.save(function (err, results) {

              if (err) return next(err);

              if(req.body.avatar){
                  var buffer = new Buffer(req.body.avatar.image.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
                  fs.writeFile('./img/user/avatar/user-avatar-'+user.username+'-'+id+'.jpg', buffer, 'base64', function(err) {
                      if(err) {
                        return next(err);
                      } else{
                        return res.json(user);
                      }
                  });
              } else {
                return res.json(user);
              }

          });

      }
  });
};



/**
 * Updates a user by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */


UserController.prototype.updateUser = function(req, res, next){
  if (req.user) {

  User.findById(req.user._id, function(err, user) {

    if (err) {
      return next(err);
    }

    if (req.body.firstName) {
      user.firstName = req.body.firstName; // update the users first name
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName; // update the users first name
    }
    if (req.body.username) {
        User.findById(req.body.username, function(err, user) {
            if(err) {
              return next(err);
            }
            else {
                user.username = req.body.username;
            }
        });
    }
    if (req.body.email) {
        User.findById(req.body.email, function(err, user) {
            if(err) {
              return next(err);
            }
            else {
                user.email = req.body.email;
            }
        });
    }

    user.lastUpdated = new Date();

    // save the user
    user.save(function(err) {
      if (err) {
        return next(err);
      } else {

        res.status(200).send(user);

      }
    });

  });

  }else{
    res.status(401).send();
  }
};

/**
 * Updates a user's password by id.
 *
 * @param {Object} req the request.
 * @param {Object} res the response.
 */



UserController.prototype.updateUserPassword = function(req,res){
    if (req.user) {

      User.findById(req.params._id, function(err, user) {

        if (err) {
          return next(err);
        } else {

        }

      });
    }
    else {
      res.status(401).send();
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

  User.findById(req.user._id, function(err, user) {

    if (err) {
      return next(err);
    }
    var id = uuid.v4();
    var buffer = decodeBase64Image(res.body.image);

    user.avatar.image = '/img/user/avatar/user-avatar-'+user.username+'-'+id+'.jpg';
    user.lastUpdated = new Date();

    // save the user
    user.save(function(err) {
      if (err) {
        return next(err);
      }

      fs.writeFile('./img/user/avatar/user-avatar-'+user.username+'-'+id+'.jpg', buffer, 'base64', function(err) {
        if(err) {
          console.log("err", err);
        }
      });

      res.json(user);

    });

  });
  }else{
    //res.status(401).send();
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
              return next(err);
            }
            res.status(200).send();
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
        return next(err);
      } else {
        res.json(user);
      }
    });
  }else{
    res.status(401).send();
  }
};


module.exports = UserController;
