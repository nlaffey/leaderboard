const mongoose = require('mongoose');

const db = mongoose.connection;
const dbAddress = 'mongodb://localhost/leaderboard';
mongoose.connect(dbAddress);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
    console.log('Successfully connected to db at: ' + dbAddress);
});

module.exports = db;