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
        const server = app.listen(IUStudioMock.config.port);
        bootstrap();
        done && done(server);
    })
}