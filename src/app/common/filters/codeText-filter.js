'use strict';

/**
 * @class CodeTextFilter CodeList的Code转文字
 * @alias module:common/filters.CodeTextFilter
 *
 * @example
 *   {{item | codeText:'permission'}}
 */
function CodeTextFilter(CodeList) {
	'ngInject';

    return function (input, key) {
	    if (!input) {
	        return '';
	    }
	    return CodeList[key][input];
    };
}

module.exports = {
    name: 'codeText',
    fn: CodeTextFilter
};
