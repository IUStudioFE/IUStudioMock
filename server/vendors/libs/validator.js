/**
 * @module vendors/libs/validator
 * @description 校验器
 * @author wing
 */

const {
    isFunction,
    isInteger,
    toNumber,
    isNumber,
    isNaN,
    isEmpty,
    isRegExp,
    isString,
    isObject,
    isArray
} = require('lodash');

const ruleRegex =
    /^([a-zA-Z]+)(?:\[(["']?\w+["']?|[0-9]*(?:\.{2}[0-9]*)|\/.*\/[a-zA-z]{0,3})])?$/;
/**
 * 验证输入项是否为空
 * @param value
*/
function validateNotEmpty(value) {
    return !isEmpty(value);
}

/**
 * 验证输入项长度
 * @param value
 * @param limit
 * @param type
 */
function validateLength(value, limit, type) {
    switch (type) {
        case 'min': 
            return value.length >= limit;
        case 'max':
            return value.length <= limit;
        case 'exact':
            return value.length === limit;
        default:
            return true;
    }
}

/**
 * 验证是否满足对应正则
 * @param regex
 * @param value
 */
function validateRegex(value, regex) {
    let regexp;
    if(isString(regex)) {
        const match = regex.match(new RegExp('^/(.*?)/([gimy]*)$'));
        regexp = new RegExp(match[1], match[2]);
    } else if(isRegExp(regex)) {
        regexp = regex;
    }

    return regexp ? regexp.test(value) : false;
}

function _validate(value, rules, data) {
    //cascsd [ 'notEmpty', 'maxLength[20]' ] { username: 'cascsd', password: '' }
    console.log(value);
    console.log(rules)
    console.log(data);
    let msg = '';
    let valid = rules.every((rule) => {
        msg = rule;
        // 如果是自定义的函数验证
        if(isFunction(rule)) {
            return rule(value);
        }
        const matched = rule.match(ruleRegex);
        const criteria = matched[1];
        const limit = matched[2];
        console.log(matched, 'rr');
        switch(criteria) {
            case 'notEmpty': 
                return validateNotEmpty(value);
            case 'minLength':
                return validateLength(value, limit, 'min');
            case 'exactLength':
                return validateLength(value, limit, 'exact');
            case 'maxLength':
                return validateLength(value, limit, 'max');
            case 'regex':
                return validateRegex(value, limit);
            default:
                return true;
        }
    })
    console.log(msg, 11, !valid);
    return {error: !valid, msg}
}

module.exports = {
    validate(data, config, cb) {
        const errMap = {};
        const keys = Object.keys(config);
        let length = keys.length;
        // 并行验证
        keys.forEach((key) => {
            const rules = config[key];
            const value = data[key];
            setTimeout(() => {
                errMap[key] = rules ? _validate(value, rules, data) : { error: false, msg: 'succedd' };
                if(--length == 0) {
                    cb(null, errMap);
                }
            }, 0)
        })
    }
}