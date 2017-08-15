'use strict';

/**
 * @class Expression 验证表达式
 * @memberOf module:common/constants.ValidationRules
 */
let _expression = {
    /**
     * 必须Check
     * @param  {String} value 验证对象的值
     * @return 是否正确
     */
    required: function(value) {
        return !!value;
    },
    /**
     * URL Check 正则表达式
     * @type {String}
     */
    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    /**
     * email Check
     * @param  {String} value 验证对象的值
     * @return 是否正确
     */
    email: function(value) {
        if (value) {
            return /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value);
        } else {
            return true;
        }
    },
    /**
     * 数字 Check
     * @param  {String} value 验证对象的值
     * @return 是否正确
     */
    number: function(value) {
        if (value) {
            return /^\d+$/.test(value);
        } else {
            return true;
        }
    },
    /**
     * 最小长度 Check
     * @param {String} value 验证对象的值
     * @param {Object} scope
     * @param {Object} element
     * @param {Object} attrs
     * @param {int} 最小长度
     * @return 是否正确
     */
    minlength: function(value, scope, element, attrs, param) {
        if (value) {
            return value.length >= param;
        } else {
            return true;
        }
    },
    /**
     * 最大长度 Check
     * @param {String} value 验证对象的值
     * @param {Object} scope
     * @param {Object} element
     * @param {Object} attrs
     * @param {int} 最小长度
     * @return 是否正确
     */
    maxlength: function(value, scope, element, attrs, param) {
        if (value) {
            return value.length <= param;
        } else {
            return true;
        }
    },
    /**
     * 英文数字 Check
     * @param  {String} value 验证对象的值
     * @return 是否正确
     */
    alphaNumber: function(value) {
        if (value) {
            return /^[a-zA-Z0-9]*$/.test(value);
        } else {
            return true;
        }
    },
    /**
     * 手机号码 Check
     * @param  {String} value 验证对象的值
     * @return 是否正确
     */
    mobilephone: function(value) {
        if (value) {
            return /^[1-9][0-9]{10}$/.test(value);
        } else {
            return true;
        }
    }
};

/**
 * @class DefaultMsg 默认出错消息
 * @memberOf module:common/constants.ValidationRules
 */
let _defaultMsg = {
    required: {
        error: '请输入'
    },
    url: {
        error: 'URL格式不正确',
    },
    email: {
        error: '邮箱地址的格式不正确',
    },
    number: {
        error: '请输入数字'
    },
    minlength: {
        error: '最小长度不正确'
    },
    maxlength: {
        error: '最大长度不正确'
    },
    alphaNumber: {
    	error: '请输入英文或者数字'
    },
    mobilephone: {
    	error: '请输入正确的电话号码'
    }
};

/**
 * @class ValidationRules 验证规则
 * @alias module:common/constants.ValidationRules
 */
let ValidationRules = {
    expression: _expression,
    defaultMsg: _defaultMsg
};

module.exports = {
     name: 'ValidationRules',
     fn: ValidationRules
};
