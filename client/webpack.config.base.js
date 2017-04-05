/**
 * @module webpack.config.base
 * @description 基础webpack配置
 * @author wing
 */
const path = require('path');
const webpack = require('webpack');

module.exports = function() {
    return {
        entry: [
            path.resolve(__dirname, 'src/js/index.js')
        ],
        output: {
            path: path.resolve(__dirname, 'dist/assets/js'),
            filename: 'app.bundle.[hash].js',
            chunkFilename: '[id].[chunkhash].js',
            publicPath: '/assets/js/',
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                $utils: path.resolve(__dirname, 'src/js/utils')
            }
        },
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react-router': 'ReactRouter',
            'redux': 'Redux',
            'react-redux': 'ReactRedux',
            'lodash': '_',
            'immutable': 'Immutable'
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.(jpg|png)$/,
                use: [
                    'url-loader?limit=8192'
                ]
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            }]
        },
        plugins: []
    }
}