'use strict';

var info = require('../../services/info');

module.exports = {
    index: index
};

function index(req, res) {
    res.json(info.package());
}
