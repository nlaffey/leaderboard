var webpack = require('webpack');

module.exports = {
    entry: {
        'main': "./src/index.js",
    },
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    presets: ['es2015','react'],
    node: {
        fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", 'resolve-url', 'sass?sourceMap']
            },
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /(node_modules)/,
                query: {presets: ['es2015','react']}
            },
            {
                test: /\.jsx?/,
                include: __dirname + "/src",
                loader: 'babel'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?name=img/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(ico|eot|woff2?|ttf)$/i,
                loader: 'file?name=img/[name].[ext]'
            }
        ]
    }
};
