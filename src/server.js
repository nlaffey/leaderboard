const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../webpack.config.js');
const bodyParser = require('body-parser');
const dbConnection = require('./database/database');
const multer = require('multer'); //middleware for handling multipart/form-data,
const upload = multer();
const contract = require('./contract/contract');
var basicAuth = require('basic-auth-connect');

const dbContract = new contract(dbConnection);

// TODO: Review why process.env.NODE_ENV is undefined here
const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// Authenticator
app.use(basicAuth('hire', 'nickLaffey'));

if (isDeveloping) {
    console.log('in development mode');
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('/', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')));
        res.end();
    });
} else {
    app.use(express.static('/build'));
    app.get('/', function response(req, res) {
        res.sendFile(path.join('/build/index.html'));
    });
}


const DUPLICATE_KEY_ERROR = 11000;

app.post('/addPlayer', upload.array(), function (req, res) {
    dbContract.addPlayer(req.body, function (promise) {
        promise.then(function (response) {
            res.send(response);
        }).catch(function (err) {
            if (err.code == DUPLICATE_KEY_ERROR) {
                res.status(400);
                res.send(err);
            } else {
                res.status(500);
                res.send(err);
            }
        });
    });
});

app.post('/gameResults', upload.array(), function (req, res) {
    dbContract.addGameResults(req.body, function (result) {
        // TODO: Error handling.
        res.send(result);
    });
});

app.get('/gameResults', function (req, res) {
    dbContract.getGameResults(function (promise) {
        promise.then(function (results) {
            res.send(results)
        }).catch(function (err) {
            res.status(500);
            res.send(err);
        });
    });
});


app.get('/getPlayers', function (req, res) {
    dbContract.getPlayers(function (promise) {
        promise.then(function (players) {
            res.send(players);
        }).catch(function (err) {
            res.status(500);
            res.send(err);
        });
    });
});


app.get('/clearData', function (req, res) {
    dbContract.clearData();
    res.send('database cleared');
});


const port = isDeveloping ? 3000 : process.env.PORT;
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});