/**
 * @module vendors/services/logger
 * @description 日志
 * @author wing
 */
const log4js = require('log4js');
const logConfig = require('../../config/log');

if (logConfig.console === void 0 || logConfig.console) {
    log4js.addAppender(log4js.appenders.console(), 'app');
}

const logger = log4js.getLogger('app');
logger.setLevel(logConfig.level.toUpperCase() || 'TRACE');

module.exports = logger;