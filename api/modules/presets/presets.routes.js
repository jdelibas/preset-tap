'use strict';

var express = require('express');
var router = express.Router();

var controller = require('./presets.controller');
var prefix = '/presets';

module.exports = router;

router.get(prefix, controller.index);
router.post(prefix, controller.create);
router.get(prefix + '/:presetID', controller.read);
router.put(prefix + '/:presetID', controller.update);
router.delete(prefix + '/:presetID', controller.delete);
