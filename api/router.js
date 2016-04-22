'use strict';

var express = require('express');
var router = express.Router();

var routePrefix = '/v1';

module.exports = router;

router.get('/', function(req, res) {
    res.status(400).json('Api version not specified in route');
});

router.use(routePrefix, require('./modules/index/index.routes'));
router.use(routePrefix, require('./modules/presets/presets.routes'));

router.get('/*', function(req, res) {
    res.status(404).json('No such api route');
});
