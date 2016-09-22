const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser');
const db = require('./database');
const multer = require('multer'); //middleware for handling multipart/form-data,
const upload = multer();
const contract = require('./contract');

const dbContract = new contract(db);

// TODO: Review why process.env.NODE_ENV is undefined here
const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

if (isDeveloping) {
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
    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')));
        res.end();
    });
} else {
    app.use(express.static(__dirname + '/build'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'build/index.html'));
    });
}


app.post('/newPerson', upload.array(), function (req, res) {
    dbContract.addPerson(req.body)
});

const port = isDeveloping ? 3000 : process.env.PORT;
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});