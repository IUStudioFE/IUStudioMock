/**
 * @module vendors/middlewares/router
 * @description 路由中间件
 * @author wing
 */

const Router = require('koa-router');
const _ = require('lodash');
const {prefix, version} = require('../../config/api');

function isGenerator(fn) {
    return fn.constructor.name === 'GeneratorFunction';
}

// 加载路由
module.exports = function() {
    const router = new Router();

    const routes = IUStudioMock._routes;
    _.forEach(routes, (routeObj, root) {
        const model = IUStudioMock.getModel(root);
        _.forEach(routeObj, (route, path) => {
            // 配置填充
            route = _.defaults(routeObj[path], {
                action: path,
                url: path,
                method: 'post',
                params: [],
                rules: {}
            });

            const {action, url, method} = route;
            const rputeUrl = `/${prefix}/${version}/${root}/${url}`;
            router[method === '*' ? 'all' : method](routeUrl, function *(next) {
                const param = this.request.body;
                let resp;
                try {
                    if(isGenerator(action)) {
                        resp = yield action.bind(this)(param);
                        this.body = resp;
                    } else if(typeof action === 'string') {
                        resp = yield model[action](param);
                        this.body = resp || {};
                    } else {
                        this.throw(new Error('router action must be a generator or a string'));
                    }
                    IUStudioMock.logger.debug(`[REQUEST] ${this.url}, [params]: ` + JSON.stringify(param) + ', [res]: ' + JSON.stringify(this.body));
                    yield next;
                } catch (err) {
                    this.throw(err);
                }
            })
        })
    })

    return router.routes();
}