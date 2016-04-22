'use strict';

var mongoose = require('mongoose');

// PRESET Schema
var presetOptions = {
    discriminatorKey: 'type'
};

var presetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['EQUALIZER', 'COMPRESSOR']
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userSchema'
    }
}, presetOptions);
var Preset = mongoose.model('Preset', presetSchema);

// EQUALIZER Sub Schema
var equalizerSubSchema = new mongoose.Schema({
    //jscs:disable
    properties: {
        low_band: {
            type: Boolean,
            default: true
        },
        low_peak_shelf: {
            type: String, //peak - shelf
            default: 'peak'
        },
        low_freq: {
            type: Number,
            default: 0
        },
        low_gain: {
            type: Number,
            default: 0
        },

        low_mid_band: {
            type: Boolean,
            default: true
        },
        low_mid_hi_low_q: {
            type: String, // Hi
            default: 'hi'
        },
        low_mid_freq: {
            type: Number,
            default: 0
        },
        low_mid_gain: {
            type: Number,
            default: 0
        },

        hi_mid_band: {
            type: Boolean,
            default: false
        },
        hi_mid_freq: {
            type: Number,
            default: 0
        },
        hi_mid_gain: {
            type: Number,
            default: 0
        },

        hi_band: {
            type: Boolean,
            default: false
        },
        hi_peak_shelf: {
            type: String,
            default: 'peak'
        },
        hi_freq: {
            type: Number,
            default: 0
        },
        hi_gain: {
            type: Number,
            default: 0
        }
    }
    //jscs:enable
});
var Equalizer = Preset.discriminator('EQUALIZER',
  equalizerSubSchema);

// COMPRESSOR Sub Schema
var compressorSubSchema = new mongoose.Schema({
    //jscs:disable
    properties: {
        mode: String, //creative
        attack: Number,
        release: Number,
        threshold: Number,
        ratio: String, //7:1
        presence: Number,
        make_up: Number
    }
    //jscs:enable
});
var Compressor = Preset.discriminator('COMPRESSOR',
  compressorSubSchema);
