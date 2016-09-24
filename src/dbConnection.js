const mongoose = require('mongoose');
const dbConnection = mongoose.connection;
const isDeveloping = process.env.NODE_ENV !== 'production';

var dbAddress;
if (isDeveloping) {
    dbAddress = 'mongodb://localhost/leaderboard';
} else {
    dbAddress = "mongodb://nlaffey:leaderboard@ds025583.mlab.com:25583/heroku_9g0m2zq4";
}
mongoose.connect(dbAddress);

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', ()=> {
    console.log('Successfully connected to DB at: ' + dbAddress);
});

module.exports = dbConnection;