var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    lastUpdated : Date
});

module.exports = mongoose.model('User', UserSchema);
