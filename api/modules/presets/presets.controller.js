'use strict';

var sanitizer = require('sanitizer');
var model = require('./presets.model');

module.exports = {
    index: index,
    read: read,
    create: create,
    update: update,
    delete: remove
};

function index(req, res) {
    return model.getAll(function(err, data) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(data);
    });
}

function read(req, res) {
    var presetID = sanitizer.sanitize(req.params.presetID);
    return model.read(presetID, function(err, data) {
        if (err) {
            return res.status(500).json(err);
        }
        if (!data) {
            return res.status(404).json(presetID + ' not found');
        }
        return res.json(data);
    });
}

function create(req, res) {
    if (!req.body.type) {
        res.status(400).json('Document type must be defined');
    }
    return model.create(req.body, function(err, data) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(data);
    });
}

function update(req, res) {
    var presetID = sanitizer.sanitize(req.params.presetID);
    if (!req.body.type) {
        res.status(400).json('Document type must be defined');
    }
    return model.update(presetID, req.body, function(err, data) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(data);
    });
}

function remove(req, res) {
    var presetID = sanitizer.sanitize(req.params.presetID);
    return model.delete(presetID, function(err, data) {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(data);
    });
}
