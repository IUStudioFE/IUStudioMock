/**
 * @module vendors/middlewares/error
 * @description 错误处理中间件
 * @author wing
 */
const _ = require('lodash');
const chalk = require('chalk');
const json = require('../libs/json');

module.exports = function() {
    return function *(next) {
        try {
            yield next;
            if(this.response.status === 404 && !this.response.body) {
                this.throw(404);
            }
        } catch(err) {
            console.log(err);
            let error = _.defaults(err, {
                status: 500,
                msg: err.msg || '',
                code: err.status === 401 ? IUStudioMock.$errors.UNAUTHORIZED_API.code : IUStudioMock.$errors.UNKNOWN.code,
                body: {}
            });
            error.msg = error.msg.replace('\n', '');

            // 方便其他程序捕获异常
            this.app.emit('error', new Error(err.msg), this);
            this.response.status = error.status || 500;

            const errMsg = `[REQUEST] ${chalk.bgYellow.black(this.request.url)}:\n` +
                `${chalk.underline('params:')}\n${json.toJSON(this.request.body)}\n` +
                `${chalk.underline('error:')}\n${json.toJSON(error)}`;

            // log
            IUStudioMock.logger.error(errMsg);

            this.body = _.pick(error, ['msg', 'code', 'body']);
        }
    }
}