/**
 * @module vendors/libs/json
 * @description json 支持
 * @author wing
 */

module.exports = {
    toJSON(str, pretty = true) {
        if(pretty) {
            return JSON.stringify(str, null, '\t');
        } else {
            return JSON.stringify(str);
        }
    }
}