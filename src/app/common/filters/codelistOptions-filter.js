'use strict';

/**
 * @class CodelistOptionsFilter CodeList下拉列表Filter
 * @alias module:common/filters.CodelistOptionsFilter
 *
 * @example
 *   <select class="form-control" ng-model="vmSearchBar.searchTargetType" ng-options="{{'searchTargetType' | codelistOptions}}">
 *   </select>
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
