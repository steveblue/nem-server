var mongoose = require('mongoose');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
var Schema = mongoose.Schema;

/**
 * User
 *
 * The model for a User
 *
 *
 *
 * @param {String} firstName The new user's first name.
 * @param {String} lastName The new user's last name.
 * @param {String} username The new user's intended username.
 * @param {String} password The new user's password.
 * @param {String} email The new user's email address.
 * @param {Object} avatar Contains one parameter (avatar.image) that expects a base64 image.
 * @api public
 */


var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastUpdated : Date,
    created: Date,
    avatar: {
        image: String
    }
});

// prevent password hash from being returned in model
UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);
