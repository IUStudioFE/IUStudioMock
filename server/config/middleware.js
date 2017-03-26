/**
 * @module config/middleware]
 * @description 中间件配置
 * @author wing
 */
const { validator, router, error, logger } = require('../vendors/middlewares');
const jwt = require('koa-jwt');

const apiConfig = require('../config/api');

module.exports = {
    // 中间件顺序

    order: [
        'koa-bodyparser',
        'error',
        'jwt',
        'validator',
        'router',
        'logger'
    ],
    
    jwt: function() {
        const { prefix, version } = apiConfig;
        const authRouteRegex = new RegExp(`^/${prefix}/${version}/auth/`);
        return jwt({secret: IUStudioMock.config.secret}).unless({path: [authRouteRegex]})
    },

    validator,
    router,
    logger,
    error
}