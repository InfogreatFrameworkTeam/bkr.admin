'use strict';

/**
 * @class CodelistOptionsFilter CodeList下拉列表Filter
 * @alias module:common/filters.CodelistOptionsFilter
 *
 * @param  {String} input codelist的KEY
 * @return codelist options的描述字符串
 *
 * @example
 * // result: ng-options="key as value for (key, value) in codelist.searchTargetType"
 * <select class="form-control" ng-model="vmSearchBar.searchTargetType" ng-options="{{'searchTargetType' | codelistOptions}}">
 * </select>
 */
function CodelistOptionsFilter() {
	'ngInject';
    return function (input) {
	    return 'key as value for (key, value) in codelist.' + input;
    };
}

module.exports = {
    name: 'codelistOptions',
    fn: CodelistOptionsFilter
};
