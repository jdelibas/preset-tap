'use strict';

var _ = require('lodash');
var schema = require('./presets.schema');
var types = ['equalizer', 'compressor'];

module.exports = {
    getAll: getAll,
    create: create,
    read: read,
    update: update,
    delete: remove
};

function getAll(callback) {
    return schema.preset.find({}, callback);
}

function create(doc, callback) {
    var type = doc.type.toLowerCase();
    if (!_.includes(types, type)) {
        return callback('Incorrect type');
    }
    return schema[type].create(doc, callback);
}

function read(id, callback) {
    return schema.preset.findById(id, callback);
}

function update(id, doc, callback) {
    var type = doc.type.toLowerCase();
    if (!_.includes(types, type)) {
        return callback('Incorrect type');
    }
    return schema[type].findByIdAndUpdate(id, doc, {
        new: true
    }, callback);
}

function remove(id, callback) {
    return schema.preset.findByIdAndRemove(id, callback);
}
