/**
 * @module vendors/middlewares/validator
 * @description 验证中间件
 * @author wing
 */
const validator = require('../libs/validator');
const thunkify = require('thunkify');
const _ = require('lodash');
const { prefix, version } = require('../../config/api');

const validate = thunkify(validator.validate);

module.exports = function() {
    return function *(next) {
        // 获得请求体
        const { body } = this.request;
        console.log(body, 1);
        const url = this.request.url.replace(`/${prefix}/${version}`, '');
        console.log(url);
        let routeKey = null;
        // 获得当前请求的路由
        let routeObj = _.filter(IUStudioMock._routes, (value, key) => {
            routeKey = key;
            const regex = new RegExp(`^/${key}/`);
            return regex.test(url);
        })[0];

        if(routeObj) {
            const route = _.filter(routeObj, (value, key) => {
                const regex = new RegExp(`^/${routeKey}/${value.url || key}[/]{0,1}`);
                return regex.test(url);
            })[0]
            if(!route) {
                yield next;
            } else {
                // 组包
                const acceptParams = Object.keys(route.rules);
                const data = _.pick(body, acceptParams);
                console.log(acceptParams, 'acceptParams');
                console.log(data, 'data');
                // 校验
                if (!_.isEmpty(route.rules)) {
                    const errMap = yield validate(data, route.rules);
                    const errors = Object.keys(errMap).reduce((errors, key) => {
                        const value = errMap[key];
                        if (value.error) {
                            errors.push(`参数 [${key}] 的规则 [\'${value.msg}\'] 不通过`);
                        }
                        return errors;
                    }, []);
                    if (errors.length > 0) {
                        const error = IUStudioMock.$errors.INVALID_PARAM;
                        error.body = {
                            invalids: errors
                        }
                        throw(error);
                    }
                }
                this.request.body = data;
                yield next;
            }
        } else {
            yield next;
        }
    }
}