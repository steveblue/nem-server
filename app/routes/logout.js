var router = require('express').Router();
var Controller = require('../controllers/session');
var SessionController = new Controller();


/**
 * Logout of the service.
 *
 * endpoint: `/logout`
 * method: POST
 *
 * @return {Integer} 200.
 * @api public
 */


router.post('/',SessionController.logout);

module.exports = router;
