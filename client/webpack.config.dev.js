/**
 * @module webpack.config.dev
 * @description webpack 开发环境配置环境项
 * @author wing
 */
const path = require('path');
const webpack = require('webpack');

const base = require('./webpack.config.base');

const publicToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJwdWJsaWMiLCJpYXQiOjE0OTA1Mjc0Mzd9.hMWrMcFCRtQmLOJjbVYre4XDIfRzuAJ1ZmG3izapoy8';

module.exports = function() {
    return Object.assign({}, base, {
        devtool: 'cheap-module-eval-source-map',
        entry: [
            path.resolve(__dirname, 'src/js'),
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://0.0.0.0:9001',
            'webpack/hot/only-dev-server'
        ],
        output: {
            path: path.resolve(__dirname, 'dist/assets/js'),
            filename: 'app.bundle.js',
            chunkFilename: '[id].[chunkhash].js',
            publicPath: '/webpack/'
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({
                PUBLIC_TOKEN: JSON.stringify(publicToken)
            })
        ]
    })
}