// Session Create Route

var express = require('express');
var SessionController = require('../controllers/session');
var router = express.Router();
var session = new SessionController();


router.post('/',function(req,res){

  session.getCurrent(req,res);

});

module.exports = router;
