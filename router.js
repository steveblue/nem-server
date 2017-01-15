// ===========================================================================
// router.js
// @description: Setup api routes.
// @authors: Steve Belovarich
// ===========================================================================
var express = require('express');
var config = require('./config');
var session = require('express-session');
var router = require('express').Router();
module.exports = function(app,passport) {
  'use strict';

  // =========================================================================
  // ROUTER CONFIG
  // =========================================================================

  app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Origin', req.headers.origin); // wide open!
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');

    // intercept OPTIONS method
    if (req.method == 'OPTIONS' ) {
      res.status(200).send();
    }
    else {
      next();
    }

  });

  app.use(session({ secret: config.key, resave: true, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  // =========================================================================
  // ROUTES
  // =========================================================================
  app.use('/', express.static(process.cwd() + '/client'));
  app.use('/docs', express.static(process.cwd() + '/docs'));
  app.use('/404', express.static(process.cwd() + '/404'));

  app.use('/api', router);
  app.use('/api/login', require('./app/routes/login'));
  app.use('/api/logout', require('./app/routes/logout'));
  app.use('/api/session', require('./app/routes/session'));
  app.use('/api/user', require('./app/routes/user'));

  //
  // app.get('*', function(req, res, next) {
  //   var err = new Error();
  //   err.status = 404;
  //   next(err);
  // });
  //
  // // handling 404 errors
  // app.use(function(err, req, res, next) {
  //
  //   if(err.status !== 404) {
  //     return next();
  //   }
  //   if(err.status === 404){
  //      res.redirect('/404');
  //   }
  //
  //
  // });

  return router;

};
