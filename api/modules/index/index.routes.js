'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./index.controller');
var prefix = '/';

module.exports = router;

router.get('/', controller.index);
