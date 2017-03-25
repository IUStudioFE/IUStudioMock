/**
 * @module models/auth
 * @description  授权模型
 * @author wing
 */

const jwt = require('koa-kwt');
const bcrypt = require('bcrypt-as-promised');

module.exports = {
    /**
     * 登录
     * @param claims
     */
    login: function(claims) {
        const {username, password} = claims;
        const User = IUStudioMock.grtModel('user');
        return User.query({
            where: {
                username
            }
        }).then((user) => {
            return bcrypt.compare(password, user.get('password'));
        }).then(() => {
            return jwt.sign(claims, IUStudioMock.config.secret, { expiresIn: 60 * 5 });
        })
    },

    /**
     * 注册yonghu 
     * @param param
     */
    signUp: function(param) {
        const User = IUStudioMock.getModel('user');
        return User.create(param);
    }
}