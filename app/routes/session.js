var router = require('express').Router();
var Controller = require('../controllers/session');
var SessionController = new Controller();


/**
 * Validate the user has a session.
 *
 * endpoint: `/session`
 * method: GET
 *
 *
 * @return {Integer} 200
 * @api public
 */

router.get('/', SessionController.validate);


module.exports = router;
