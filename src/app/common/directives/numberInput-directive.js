'use strict';

/**
 * @class NumberInputDirective 数字项目格式化控件
 * <p>在获得和失去焦点时格式化数字</p>
 * @alias module:common/directives.NumberInputDirective
 * @param {Object} $filter
 * @return {Directive}
 *
 * @example
 * // model.amount = 12345;
 * // 画面上表示为123,45，当控件获得焦点时显示为12345
 * <input name="amount" numberInput ng-model="model.amount">
 */
function NumberInputDirective($filter) {
    'ngInject';

    let toCurrency = $filter('number');

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, elem, attrs, ctrl) {
            let firstLoad = true;

            var rawElem = elem[0];
            if (!ctrl) {
                return;
            }

            function updateView(hasFocus) {
                if (!ctrl.$modelValue) {
                    return;
                }
                var displayValue = hasFocus ?
                    ctrl.$modelValue :
                    toCurrency(ctrl.$modelValue);
                rawElem.value = displayValue;

                if (!displayValue) {
                    ctrl.$setViewValue('');
                }
            }

            elem.on('focus', updateView.bind(null, true));
            elem.on('blur', updateView.bind(null, false));

            scope.$watch(attrs.ngModel, function(newValue) {
                if (firstLoad && newValue) {
                    updateView(false);
                    firstLoad = false;
                }
            });
        }
    };
}

module.exports = {
    name: 'numberInput',
    fn: NumberInputDirective
};
