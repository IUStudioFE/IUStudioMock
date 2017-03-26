/**
 * @module vendors/middlewares/router
 * @description 路由中间件
 * @author wing
 */

const Router = require('koa-router');
const _ = require('lodash');
const {prefix, version} = require('../../config/api');

// 加载路由
module.exports = function() {
    const router = new Router();

    const routes = IUStudioMock._routes;
    _.each(routes, (routeObj, root) => {
        _.each(routeObj, (route, path) => {
            // 配置填充
            route = _.defaults(routeObj[path], {
                method: 'post',
                params: [],
                rules: {}
            });

            let { action, method } = route;
            const routeUrl = `/${prefix}/${version}/${root}/${path}`;
        
            // 校正action
            if(!_.isString(action)) {
                action = IUStudioMock._controllers[root][path];
            } else {
                const paths = action.split('/');
                action = IUStudioMock._controllers[paths.slice(0 ,2).join('/')][paths[2]];
            }

            router[method === '*' ? 'all' : method](routeUrl, action);
        })
    })

    return router.routes();
}