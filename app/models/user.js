var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * User
 *
 * The model for a user.
 *
 *
 * @param {String} firstName The new user's first name.
 * @param {String} lastName The new user's last name.
 * @param {String} username The new user's intended username.
 * @return {Object} User The User Object.
 */


var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    lastUpdated : Date,
    created: Date
});

module.exports = mongoose.model('User', UserSchema);
