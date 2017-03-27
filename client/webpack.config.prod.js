/**
 * @module webpack.config.prod
 * @description webpack 生产环境配置环境项
 * @author wing
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config.base');

const publicToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJwdWJsaWMiLCJpYXQiOjE0OTA1Mjc0Mzd9.hMWrMcFCRtQmLOJjbVYre4XDIfRzuAJ1ZmG3izapoy8';

module.exports = function() {
    return Object.assign({}, base, {
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                PUBLIC_TOKEN: JSON.stringify(publicToken),
            }),
            new HtmlWebpackPlugin({
                title: 'Mock server',
                template: 'handlebars-loader!./src/index.hbs',
                filename: path.resolve(__dirname, './dist/index.html'),
            })
        ]
    })
}