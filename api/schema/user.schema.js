'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true
    }
});
