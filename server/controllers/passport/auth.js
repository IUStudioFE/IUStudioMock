/**
 * @module controllers/passport/auth
 * @description 授予路由
 * @author wing
 */

const bcrypt = require('bcrypt-as-promised');
const jwt = require('koa-jwt');
const _ = require('lodash');

/**
 * Generate JSON web token
 * @param user
 */
function _getToken(user) {
    const claims = {
        uuid: user.uuid
    }
    const { secret, privateKeyTimeout } = IUStudioMock.config;

    const options = {
        algorithm: 'HS256'
    }
    
    if(_.isFinite(privateKeyTimeout)) {
        options.expiresIn = privateKeyTimeout;
    }
    return jwt.sign(claims, secret, options);
}

module.exports = {
    login: function *(next) {
        const { username, password } = this.request.body;
        // 检验身份的合法性
        const User = IUStudioMock.getModel('user');
        try {
            this.body = yield User.findOne({
                where: {
                    username
                }
            }).then(user => {
                return [user, bcrypt.compare(password, user.get('password'))];
            }).then((user) => {
                return {
                    token: _getToken(user)
                }
            })
        } catch (e) {
            this.throw(IUStudioMock.$errors.INVALID_CREDENTIALS);
        }

        yield next;
    },
    signUp: function *(next) {
        const param = this.request.body;
        const User = IUStudioMock.getModel('user');
        console.log(User.create);
        try {
            param.password = yield bcrypt.hash(param.password, 10);
            console.log(param.password);
            const user = yield User.create(param);
            console.log(user);
            this.body = {
                token: _getToken(user)
            }
        } catch(error) {
            if(error instanceof IUStudioMock.sequelize.UniqueConstraintError){
                throw IUStudioMock.$errors.USER_EXITS;
            } else {
                console.log(error);
                console.log(11);
                this.throw(IUStudioMock.$errors.UNKNOWN);
            }
        }

        yield next;
    }
}