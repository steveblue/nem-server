// server.js
// @description: Setup server, register models and routes, start up express server.
// @authors: Steve Belovarich
// =============================================================================++

// packages
var express = require('express'); // call express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express(); // define our app using express

// connect to mongodb

mongoose.connect('mongodb://104.236.145.120:27017'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 5555; // set our port

// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

// routes
var routes = require('./router')(app);


// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Server on port ' + port);

module.exports = app;
