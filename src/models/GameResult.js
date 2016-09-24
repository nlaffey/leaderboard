const mongoose = require('mongoose');

var schema = mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    winner: {type: String, required: true},
    loser: {type: String, required: true},
});

module.exports = mongoose.model('GameResult', schema);