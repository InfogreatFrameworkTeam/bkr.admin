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
 *     permissions="user.view, user.edit"
 */
function PermissionsDirective(SessionSrv) {
    'ngInject';

    function _isAdmin(currentUser) {
        return (currentUser.id == ADMIN_USER_ID);
    }

    /**
     * _link
     * @param  scope
     * @param  elem
     * @param  attrs
     *             permissions 权限列表，以逗号分隔
     * @return directive
     */
    function _link(scope, elem, attrs) {
        let currentUser = SessionSrv.getCurrentUser();
        if (_isAdmin(currentUser)) {
            return;
        }

        let elePermissions = attrs.permissions.split(',');
        let userPermissions = [];
        if (currentUser) {
            userPermissions = currentUser.actionList || [];
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
        link: _link
    };
    return directive;
}

module.exports = {
    name: 'permissions',
    fn: PermissionsDirective
};
