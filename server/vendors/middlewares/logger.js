/**
 * @module vendors/middlewares/logger
 * @description 日志中间件
 * @author wing
 */
const chalk = require('chalk');
const { prefix, version } = require('../../config/api');
const apiRegex = new RegExp(`^/${prefix}/${version}/`);
const json = require('../libs/json');

module.exports = function() {
    return function *(next) {
        if(apiRegex.test(this.url)) {
            const msg = `[REQUEST] ${chalk.bgYellow.black(this.request.url)}:\n` +
                `${chalk.underline('params:')}\n${json.toJSON(this.request.body)}\n` +
                `${chalk.underline('response:')}\n${json.toJSON(this.body)}`;

            IUStudioMock.logger.debug(msg);
        } else {
            yield next;
        }
    }
}