// routes.js
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

  // prefix all routes with api
  app.use('/api', router);
  app.use('/api/users', require('./app/routes/user'));

  return router;

};
