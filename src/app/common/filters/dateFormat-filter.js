'use strict';

let moment = require('moment');

/**
 * @class DateFormatFilter 日期过滤器
 * @alias module:common/filters.DateFormatFilter
 *
 * @param {String/Date} input 日期
 * @param {String} [format] 日期格式，默认：YYYY-MM-DD
 * @return 格式化后的日期字符串
 *
 * @example
 * model.date = new Date(); // today is 2017/08/01
 * // 2017-08-01
 * {{model.date | dateFormat}}
 */
function DateFormatFilter(CommonConstants) {
    'ngInject';

    return function(input, format) {
        if (!input) {
            return input;
        }

        format = format || CommonConstants.dateFormat;
        try {
            return moment(input).format(format);
        } catch (e) {
            return input;
        }
    };
}

module.exports = {
    name: 'dateFormat',
    fn: DateFormatFilter
};
