'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var connector = require('./api/connector');
var router = require('./api/router');

var app = express();
var port = process.env.PORT || 8080;

// Connect to mongo instance
connector.connect();

// for parsing application/json
app.use(bodyParser.json());

// Load routes into express router
app.use('/api', router);

// Serve the client files
app.use('/', express.static(__dirname + '/client'));

// This route deals enables HTML5Mode by forwarding missing files to the index.html
app.all('/*', function(req, res) {
    res.sendfile(__dirname + '/client/index.html');
});

app.listen(port, function () {
    console.log('Api server listening on port ', port);
});
