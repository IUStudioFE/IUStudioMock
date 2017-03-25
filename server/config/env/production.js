/**
 * @module config/env/production
 * @description 生产环境配置项
 * @author wing
 */
module.exports = {
    port: 4001,
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