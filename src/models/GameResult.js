const mongoose = require('mongoose');

var schema = mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    winners: [],
    losers: [],
});

module.exports = mongoose.model('GameResults', schema);