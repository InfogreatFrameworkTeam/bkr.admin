'use strict';

let _ = require('lodash');

/**
 * @class ConnWordsFilter 将字符串数组连接成文字
 * @alias module:common/filters.ConnWordsFilter
 *
 * @param {Array} wordArray 字符串数组
 * @param {String} separator 分隔符
 *
 * @example
 * strArr = ['a', 'b', 'c'];
 * // 'a, b, c'
 * {{strArr | connWords:','}}
 */
function ConnWordsFilter() {
	'ngInject';
	return function (wordArray, separator) {
        return _.compact(wordArray).join(separator);
    };
}

module.exports = {
    name: 'connWords',
    fn: ConnWordsFilter
};
