'use strict';

/**
 * @class CodeTextFilter CodeList的Code转文字
 * @alias module:common/filters.CodeTextFilter
 *
 * @param  {String} input codelist的值
 * @param  {String} key   codelist的KEY
 * @return codelist的表示文字
 *
 * @example
 * codelist.permission = {
 *   'user.view': '用户查看',
 *   'user.edit': '用户编辑',
 *    ...
 * };
 * model.item = 'user.edit';
 * // '用户编辑'
 * {{model.item | codeText:'permission'}}
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
