/**
 * @module models/user
 * @description 用户模型
 * @author wing
 */

module.exports = {
    // 定义
    definition: {
        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type: 'uuid'
        },
        // 用户名
        username: {
            type: 'string',
            limit: 20,
            allowNull: false,
            unique: true
        },
        // 密码
        password: {
            type: 'string',
            allowNull: false
        }
    },
    // 关系声明
    relation: {
        // ...
    },
    // 钩子
    hooks: {
        // ...
    }
}