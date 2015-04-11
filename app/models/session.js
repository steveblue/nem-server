var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * User
 *
 * The model for a login session.
 *
 *
 * @param {String} username The user's username.
 * @param {String} User The user's password.
 */


var LoginSessionSchema = new Schema({
    username: String,
    email: String,
    password: String,
    passwordSalt: String
});

module.exports = mongoose.model('LoginSession', LoginSessionSchema);
