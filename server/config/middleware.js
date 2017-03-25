/**
 * @module config/middleware]
 * @description 中间件配置
 * @author wing
 */
const { validator, router } = require('../vendors/middlwares');
const jwt = require('koa-jwt');
const path = require('path');

const apiConfig = require('../config/api');

module.exports = {
    // 中间件顺序

    order: [
        'koa-bodyparser',
        'jwt',
        'valiator',
        'router'
    ],
    
    jwt: function() {
        const { prefix, version } = apiConfig;
        const authRouteRegex = new RegExp(`^/${prefix}/${version}/auth/`);
        return jwt({secret: IUStudioMock.secret}).unless({path: [authRouteRegex]})
    },

    valiator,
    router
}