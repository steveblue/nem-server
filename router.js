// ===========================================================================
// router.js
// @description: Setup api routes.
// @authors: Steve Belovarich
// ===========================================================================

module.exports = function(app) {
  'use strict';

  var router = require('express').Router();

  // =========================================================================
  // ROUTER CONFIG
  // =========================================================================

  // middleware to use for all requests
  router.use(function(req, res, next) {
    //console.log(req);
    next(); // make sure we go to the next routes and don't stop here
  });

  // test route to make sure everything is working (accessed at GET http://localhost:5555/api)
  router.get('/', function(req, res) {
    res.json({
      message: 'api is online.'
    });
  });

  // =========================================================================
  // ROUTES
  // =========================================================================

  app.use('/api', router);
  app.use('/api/user', require('./app/routes/user'));
  app.use('/api/login', require('./app/routes/login'));
  app.use('/api/logout', require('./app/routes/logout'));
  app.use('/api/session', require('./app/routes/session'));
  app.use('/api/signup', require('./app/routes/signup'));

  return router;

};
