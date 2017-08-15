'use strict';

/**
 * @class CodeList codelist配置项
 * @alias module:common/constants.CodeList
 */
let CodeList = {
    /** 删除FLAG */
    'deleteFlag': {
        '0': '有效',
        '1': '无效'
    },
    /** 权限 */
    'permission': {
    	'user.view': '用户查看',
    	'user.edit': '用户编辑',
        'role.view': '角色查看',
        'role.edit': '角色编辑'
    }
};

module.exports = {
    name: 'CodeList',
    fn: CodeList
};
