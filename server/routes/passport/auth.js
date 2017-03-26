/**
 * @module routes/passport/auth
 * @description 授权路由
 * @author wing
 */
module.exports = {
    // login
    login: {
        method: 'post',
        rules: {
            username: [
                'notEmpty',
                'maxLength[20]'
            ],
            password: [
                'regex[/^[a-zA-Z0-9_]{6,18}$/]'
            ]
        }
    },
    // 注册
    signUp: {
        method: 'post',
        rules: {
            username: [
                'notEmpty',
                'maxLength[20]'
            ],
            password: [
                'regex[/^[a-zA-Z0-9_]{6,18}$/]'
            ]
        },
        action: 'passport/auth/signUp'
    }
};