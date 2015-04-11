var messages = function(){};

messages.EMAIL_NOT_FOUND = 0;
messages.INVALID_PWD = 1;
messages.DB_ERROR = 2;
messages.NOT_FOUND = 3;
messages.EMAIL_ALREADY_EXISTS = 4;
messages.COULD_NOT_CREATE_USER = 5;
messages.PASSWORD_RESET_EXPIRED = 6;
messages.PASSWORD_RESET_HASH_MISMATCH = 7;
messages.PASSWORD_RESET_EMAIL_MISMATCH = 8;
messages.COULD_NOT_RESET_PASSWORD = 9;

module.exports = messages;
