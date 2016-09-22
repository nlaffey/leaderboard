const mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Person', schema);