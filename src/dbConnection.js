const mongoose = require('mongoose');
const dbConnection = mongoose.connection;
const isDeveloping = process.env.NODE_ENV !== 'production';

var dbAddress;
if (isDeveloping) {
    dbAddress = 'mongodb://localhost/leaderboard';
} else {
    dbAddress = process.env.DBADDRESS;
}
mongoose.connect(dbAddress);

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', ()=> {
    console.log('Successfully connected to DB at: ' + dbAddress);
});

module.exports = dbConnection;