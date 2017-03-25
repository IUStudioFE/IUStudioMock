/**
 * @module vendors/middlewares
 * @description 中间件
 * @author wing
 */

const validator = require('./validator');
const router = require('./router');
const injector = require('./injector');

module.exports = {
    validator,
    router,
    injector
}