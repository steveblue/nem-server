var AccountController = function (userModel, session, mailer) {

    this.crypto = require('crypto');
    this.uuid = require('node-uuid');

    this.response = require('../models/response.js');
    this.errors = require('../models/error.js');
    this.currentUser = require('../models/user.js');

    this.userModel = userModel;
    this.session = session;
    this.mailer = mailer;

};

AccountController.prototype.getSession = function () {
    return this.session;
};

AccountController.prototype.setSession = function (session) {
    this.session = session;
};

AccountController.prototype.hashPassword = function (password, salt, callback) {
    // we use pbkdf2 to hash and iterate 10k times by default
    var iterations = 10000,
        keyLen = 64; // 64 bit.
    this.crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};

AccountController.prototype.logon = function(username, password, callback) {

    var that = this;

    that.userModel.findOne({ username: username }, function (err, user) {

        if (err) {
            return callback(err, new that.response({ success: false, extras: { msg: that.errors.DB_ERROR } }));
        }

        if (user) {

            that.hashPassword(password, user.passwordSalt, function (err, passwordHash) {

                if (passwordHash == user.password) {

                    var currentUser = new that.currentUser({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });

                    that.session.currentUser = currentUser;

                    return callback(err, new that.response({
                        success: true, extras: {
                            currentUser:currentUser
                        }
                    }));
                } else {
                    return callback(err, new that.response({ success: false, extras: { msg: that.errors.INVALID_PWD } }));
                }
            });
        } else {
            return callback(err, new that.response({ success: false, extras: { msg: that.errors.EMAIL_NOT_FOUND } }));
        }

    });
};

AccountController.prototype.logoff = function () {
    if (this.session.currentUser) delete this.session.currentUser;
    return;
};

AccountController.prototype.register = function (newUser, callback) {
    var that = this;
    that.userModel.findOne({ email: newUser.email }, function (err, user) {

        if (err) {
            return callback(err, new that.response({ success: false, extras: { msg: that.errors.DB_ERROR } }));
        }

        if (user) {
            return callback(err, new that.response({ success: false, extras: { msg: that.errors.EMAIL_ALREADY_EXISTS } }));
        } else {

            newUser.save(function (err, user, numberAffected) {

                if (err) {
                    return callback(err, new that.response({ success: false, extras: { msg: that.errors.DB_ERROR } }));
                }

                if (numberAffected === 1) {

                    var currentUser = new that.currentUser({
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });

                    return callback(err, new that.response({
                        success: true, extras: {
                            currentUser: currentUser
                        }
                    }));
                } else {
                    return callback(err, new that.response({ success: false, extras: { msg: me.errors.COULD_NOT_CREATE_USER } }));
                }

            });
        }

    });
};

AccountController.prototype.resetPassword = function (username, callback) {
    var that = this;
    that.userModel.findOne({ username: username }, function (err, user) {

        if (err) {
            return callback(err, new that.response({ success: false, extras: { msg: that.errors.DB_ERROR } }));
        }

        // Save the user's email and a password reset hash in session. We will use
        var passwordResetHash = that.uuid.v4();
        that.session.passwordResetHash = passwordResetHash;
        that.session.emailWhoRequestedPasswordReset = email;

        that.mailer.sendPasswordResetHash(email, passwordResetHash);

        return callback(err, new that.response({ success: true, extras: { passwordResetHash: passwordResetHash } }));
    })
};


AccountController.prototype.resetPasswordFinal = function (email, newPassword, passwordResetHash, callback) {
    var that = this;
    if (!that.session || !that.session.passwordResetHash) {
        return callback(null, new that.response({ success: false, extras: { msg: that.errors.PASSWORD_RESET_EXPIRED } }));
    }

    if (that.session.passwordResetHash !== passwordResetHash) {
        return callback(null, new that.response({ success: false, extras: { msg: that.errors.PASSWORD_RESET_HASH_MISMATCH } }));
    }

    if (that.session.emailWhoRequestedPasswordReset !== email) {
        return callback(null, new that.response({ success: false, extras: { msg: that.errors.PASSWORD_RESET_EMAIL_MISMATCH } }));
    }

    var passwordSalt = this.uuid.v4();

    that.hashPassword(newPassword, passwordSalt, function (err, passwordHash) {

        that.userModel.update({ email: email }, { passwordHash: passwordHash, passwordSalt: passwordSalt }, function (err, numberAffected, raw) {

            if (err) {
                return callback(err, new that.response({ success: false, extras: { msg: that.errors.DB_ERROR } }));
            }

            if (numberAffected < 1) {
                return callback(err, new that.response({ success: false, extras: { msg: that.errors.COULD_NOT_RESET_PASSWORD } }));
            } else {
                return callback(err, new that.response({ success: true, extras: null }));
            }
        });
    });
};

module.exports = AccountController;
