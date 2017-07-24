'use strict';

let moment = require('moment');

/**
 * @class DateSrv 日期服务
 * @alias module:common/services.DateSrv
 *
 */
function DateSrv() {
    'ngInject';

    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS';
    const DATE_REGEX = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)?([+-][0-2]\d(:?[0-5]\d)?|Z)$/;

    /**
     * @method module:common/services.DateSrv#convertDateStringsToDates 将对象中的日期型字符串全部转换为日期型
     * @param  {Object} obj 对象
     * @return {Object}
     */
    let convertDateStringsToDates = function(obj) {
        var result = obj;
        if (obj !== null) {
            result = angular.copy(obj);
            for (var key in result) {
                var property = result[key];
                if (typeof property === 'object') {
                    result[key] = convertDateStringsToDates(property);
                } else if (typeof property === 'string' && DATE_REGEX.test(property)) {
                    result[key] = new Date(property);
                }
            }
        }
        return result;
    };

    /**
     * @method module:common/services.DateSrv#convertDatesToDateStrings 将对象中的日期型全部转换为日期的字符串形式
     * @param  {Object} obj 对象
     * @return {Object}
     */
    let convertDatesToDateStrings = function(obj) {
        // Ignore things that aren't objects.
        if (typeof obj !== 'object') {
            return obj;
        }

        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }

            var value = obj[key];
            if (value) {
                // Check for string properties which look like dates.
                if (moment.isDate(value)) {
                    obj[key] = moment(value).format(DATE_FORMAT);
                } else if (typeof value === 'object') {
                    // Recurse into object
                    convertDatesToDateStrings(value);
                }
            }
        }
    };

    /**
     * @method module:common/services.DateSrv#toDate 将日期字符串转为日期
     * @param  {String} str 日期字符串
     * @return {Date}
     */
    let toDate = function(str) {
        if (str) {
            return moment(str, DATE_FORMAT).toDate();
        } else {
            return null;
        }
    };

    return {
        convertDateStringsToDates,
        convertDatesToDateStrings,
        toDate
    };
}

module.exports = {
    name: 'DateSrv',
    fn: DateSrv
};
