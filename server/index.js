var express = require('express');
var config = require('./config/config');
var logger = require('./config/logger');
var app = express();

var app = express();    

var port = process.env.port || 5000;

require('./config/express')(app, config);

console.log("Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(port, function(){
    console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

module.exports = app;