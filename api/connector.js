'use strict';

var mongoose = require('mongoose');
var dbURI = process.env.MONGODB_URI;

module.exports = {
    connect: connect
};

function connect() {
    return mongoose.connect(dbURI, function(err) {
        if (err) {
            console.log(err);
        }
    });
}
