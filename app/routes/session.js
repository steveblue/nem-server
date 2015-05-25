// Session Create Route

var router = require('express').Router();
var Controller = require('../controllers/session');
var SessionController = new Controller();



router.post('/', SessionController.validate);


module.exports = router;
