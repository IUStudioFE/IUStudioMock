/**
 * @module vendors/runner/middleware
 * @description 中间件runner
 * @author wing
 * 
 */

const middleware = require('../../config/middleware');

module.exports = {
    run(app) {
        middleware.order.forEach((middle) => {
            if(middleware.hasOwnProperty(middle)) {
                app.use(middleware[middle]());
            } else {
                app.use(require(middle)());
            }
        })
    }
}