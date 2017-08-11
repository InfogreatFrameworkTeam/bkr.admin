'use strict';

let moment = require('moment');

/**
 * @class DateFormatFilter 日期过滤器
 * @alias module:common/filters.DateFormatFilter
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
