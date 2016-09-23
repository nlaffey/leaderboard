const mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: {type: String, index: {unique: true, dropDups: true}},
    id: mongoose.Schema.Types.ObjectId,
    win: {type: Number, default: 0},
    loss: {type: Number, default: 0},
});

module.exports = mongoose.model('Person', schema);