const mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: {type: String, index: true, unique: true},
    win: {type: Number, default: 0},
    loss: {type: Number, default: 0},
    ratio: {type: Number, default: 0},
});

module.exports = mongoose.model('Player', schema);