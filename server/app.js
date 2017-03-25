/**
 * 
 * @module app
 * @description 应用程序
 * @author wing 
 * 
 */

const bootstrap = require('./vendors/bootstrap');
const app = require('koa')();

bootstrap(app);

module.exports = app;
