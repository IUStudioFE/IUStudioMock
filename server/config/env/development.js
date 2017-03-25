/**
 * @module config/env/development
 * @description 开发环境配置项
 * @author wing
 */
module.exports = {
    port: 4000,
    secret: 'IUStudio.mock.server.dev',
    db: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'wing',
        database: 'iustudiomock',
        dialect: 'mysql'
    }
}