'use strict';

const ADMIN_USER_ID = '1';

/**
 * @class PermissionsDirective 权限控制组件
 * @alias module:common/directives.PermissionsDirective
 *
 * @param  {SessionSrv} Session服务
 * @return {Directive}
 *
 * @example
 * // 如果当前用户有user.view或者user.edit权限，则块可见。否则块不可见（从DOM树移出）
 * <div permissions="user.view, user.edit">...</div>
 */
function PermissionsDirective(SessionSrv) {
    'ngInject';

    function _isAdmin(currentUser) {
        return (currentUser.id == ADMIN_USER_ID);
    }

    /**
     * _link
     * @param  scope
     * @param {String} scope.permissions @允许访问的权限列表，用逗号分割
     * @param  elem
     * @return directive
     */
    function _link(scope, elem) {
        let currentUser = SessionSrv.getCurrentUser();
        if (_isAdmin(currentUser)) {
            return;
        }

        let elePermissions = scope.permissions.split(',');
        let userPermissions = [];
        if (currentUser) {
            userPermissions = currentUser.permissions || [];
        }

        let hasPermissions = false;
        for (let i = 0; i < elePermissions.length; i++) {
            let p = elePermissions[i].trim();
            if (userPermissions.indexOf(p) >= 0) {
                hasPermissions = true;
                break;
            }
        }

        if (!hasPermissions) {
            elem.remove();
        }
    }

    let directive = {
        restrict: 'A',
        scope: {
            permissions: '@'
        },
        link: _link
    };
    return directive;
}

module.exports = {
    name: 'permissions',
    fn: PermissionsDirective
};
