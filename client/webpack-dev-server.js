/**
 * @module webpack-dev-server
 * @description webpack dev server 配置
 * @author wing
 */
const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.dev');

const devServerConfig = {
    hot: true,
    contentBase: path.resolve(__dirname, './dist'),
    host: '0.0.0.0',
    publicPath: '/webpack/',
    stats: { colors: true },
    historyApiFallback: true
    // proxy: {
    // ...   
    // } 
};

const port = 9001;

const compiler = webpack(webpackConfig());
const server = new webpackDevServer(compiler, devServerConfig);
server.listen(port, err => {
    if(err) {
        console.error(err.stack);
    } else {
        console.log(`🌍server is running at port: ${port}`);
    }
})