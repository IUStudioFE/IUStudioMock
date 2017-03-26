/**
 * @module config/log
 * @description 日志配置
 * @author wing
 */

module.exports = {
    /**
     *  日志记录级别
     *  支持: 'trace' 'debug' 'info' 'warn' 'error' 'fatal'
     *  默认: 'trace'
     */
    level: 'debug',

    /**
     * 是否在控制台输出
     * 默认： true
     * 
     */
    console: true
};