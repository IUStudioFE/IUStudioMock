/**
 * @module models/user
 * @description 用户模型
 * @author wing
 */

const bcypt = require('bcrypt-as-promised');

module.exports = {
    definition: {
        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type: 'uuid'
        },
        username: {
            type: 'string',
            allowNull: false
        },
        password: {
            type: 'string',
            allowNull: false
        }
    },

    /**
     * 创建用户
     * @param param
     */
    create: function(param) {
        return bcypt.hash(param.password, 10).then((hash, error) => {
            if(error) {
                throw new Error('generate password hash error');
            } else {
                param.password = hash;
                return this.create(param);
            }
        })
    },

    /**
     * 获得用户列表
     * @param param
     */
    list: function(param) {
        return this.findAll(param);
    },

    /**
     *  根据条件查询用户
     * @param param 
     */
    query: function(param) {
        return this.findOne)(param);
    }
}