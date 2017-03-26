/**
 * @module constants/errors
 * @description 错误定义
 * @author wing
 */
module.exports = {
    // 未知错误
    UNKNOWN: {
        status: 500,
        msg: 'unknown error',
        code: -1
    },

    // 参数校验错误
    INVALID_PARAM: {
        status: 400,
        msg: 'validate parameters failed',
        code: 1001
    },

    // 用户已存在
    USER_EXISTS: {
        status: 400,
        msg: 'user exists',
        code: 2001
    },

    // 用户名或密码错误
     INVALID_CREDENTIALS: {
        status: 400,
        msg: 'username or password error',
        code: 2002
    },

    // api未授权
    UNAUTHORIZED_API: {
        status: 401,
        msg: 'Unauthorized for this api',
        code: 3001
    }
}