const mongoose = require('mongoose');

const dbConnection = mongoose.connection;
const dbAddress = 'mongodb://localhost/leaderboard';
mongoose.connect(dbAddress);

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', ()=> {
    console.log('Successfully connected to dbConnection at: ' + dbAddress);
});

module.exports = dbConnection;