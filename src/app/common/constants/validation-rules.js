'use strict';
let _expression = {
    required: function(value) {
        return !!value;
    },
    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    email: function(value) {
        if (value) {
            return /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value);
        } else {
            return true;
        }
    },
    number: function(value) {
        if (value) {
            return /^\d+$/.test(value);
        } else {
            return true;
        }
    },
    minlength: function(value, scope, element, attrs, param) {
        if (value) {
            return value.length >= param;
        } else {
            return true;
        }
    },
    maxlength: function(value, scope, element, attrs, param) {
        if (value) {
            return value.length <= param;
        } else {
            return true;
        }
    },
    alphaNumber: function(value) {
        if (value) {
            return /^[a-zA-Z0-9]*$/.test(value);
        } else {
            return true;
        }
    },
    mobilephone: function(value) {
        if (value) {
            return /^[1-9][0-9]{10}$/.test(value);
        } else {
            return true;
        }
    }
};

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

let ValidationRules = {
	expression: _expression,
	defaultMsg: _defaultMsg
};

module.exports = {
     name: 'ValidationRules',
     fn: ValidationRules
};
