'use strict';

/**
 * 验证表达式
 * @namespace Expression
 * @memberOf module:common/constants.ValidationRules
 */
let _expression =
/** @lends module:common/constants.ValidationRules.Expression */
{
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
     * @param {int} param 最小长度
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
     * @param {int} param 最小长度
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
 * 默认出错消息
 * @namespace DefaultMsg
 * @memberOf module:common/constants.ValidationRules
 */
let _defaultMsg =
/** @lends module:common/constants.ValidationRules.DefaultMsg */
{
    /** 必须Check出错消息 */
    required: {
        error: '请输入'
    },
    /** URL Check出错消息 */
    url: {
        error: 'URL格式不正确',
    },
    /** email Check出错消息 */
    email: {
        error: '邮箱地址的格式不正确',
    },
    /** 数字 Check出错消息 */
    number: {
        error: '请输入数字'
    },
    /** 最小长度 Check出错消息 */
    minlength: {
        error: '最小长度不正确'
    },
    /** 最大长度 Check出错消息 */
    maxlength: {
        error: '最大长度不正确'
    },
    /** 英数字 Check出错消息 */
    alphaNumber: {
    	error: '请输入英文或者数字'
    },
    /** 手机号码 Check出错消息 */
    mobilephone: {
    	error: '请输入正确的电话号码'
    }
};


/**
 * 验证规则
 * @namespace ValidationRules
 * @memberOf module:common/constants
 */
let ValidationRules =
/** @lends module:common/constants.ValidationRules */
{
    /**
     * 验证表达式
     * @type {module:common/constants.ValidationRules.Expression}
     */
    expression: _expression,
    /**
     * 默认的验证消息
     * @type {module:common/constants.ValidationRules.DefaultMsg}
     */
    defaultMsg: _defaultMsg
};

module.exports = {
     name: 'ValidationRules',
     fn: ValidationRules
};
