'use strict';

let _ = require('lodash');

/**
 * @class ConnWordsFilter 将字符串数组连接成文字
 * @alias module:common/filters.ConnWordsFilter
 *
 * @example
 *   {{strArr | connWords:','}}
 */
function ConnWordsFilter() {
	'ngInject';
	return function (wordArray,separator) {
        return _.compact(wordArray).join(separator);
    };
}

module.exports = {
    name: 'connWords',
    fn: ConnWordsFilter
};
