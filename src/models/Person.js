const mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: {type: String, index: {unique: true, dropDups: true}},
    id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Person', schema);