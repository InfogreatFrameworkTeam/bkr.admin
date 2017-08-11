'use strict';

/**
 * @class TextFormatFilter 文本文字格式化
 * 将文本格式中的特殊文字转义
 * @alias module:common/filters.TextFormatFilter
 *
 * @example
 * model.memo = '第一行\r第二行';
 * // 第一行<br/>第二行
 * ng-bind-html="model.memo | textFormat"
 */
function TextFormatFilter() {
    'ngInject';
    return function(input) {
        if (!input) {
            return input;
        }
        let output = input
            .replace(/&/, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            //replace possible line breaks.
            .replace(/(\r\n|\r|\n)/g, '<br/>')
            //replace tabs
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
            //replace spaces.
            .replace(/ /g, '&nbsp;');

        return output;
    };
}

module.exports = {
    name: 'textFormat',
    fn: TextFormatFilter
};
