/**
 * 
 * @module vendors/bootstrap
 * @description 启动脚本
 * @author wing 
 * 
 */

const { configure, middleware } = require('./runner');

const bootstrap = require('../config/bootstrap');

module.exports = function(app, done) {
    configure.run(app, () => {
        middleware.run(app);
        bootstrap();
        const server = app.listen(MOCK.config.port);
        done && done(server);
    })
}