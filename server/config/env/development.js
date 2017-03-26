/**
 * @module config/env/development
 * @description 开发环境配置项
 * @author wing
 */
module.exports = {
    port: 4000,
    secret: 'IUStudio.mock.server.dev',
    privateKeyTimeout: Infinity,
    publicToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJwdWJsaWMiLCJpYXQiOjE0OTA1Mjc0Mzd9.hMWrMcFCRtQmLOJjbVYre4XDIfRzuAJ1ZmG3izapoy8',
    db: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'wing',
        database: 'iustudiomock',
        dialect: 'mysql'
    }
}