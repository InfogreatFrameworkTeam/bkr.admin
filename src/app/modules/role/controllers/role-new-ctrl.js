/**
 * 控制器：角色新增
 */
'use strict';

function RoleNewCtrl($controller, RoleSrv) {
    'ngInject';

    let vm = this;

    // 更新前处理
    function preSaveFn() {
        // 编辑权限列表成为字符串数组形式
        vm.model.permissions = RoleSrv.convPermissionForSave(vm.permissionList);
    }

    let ctrlOpts = {
        modelName: 'role',
        preSaveFn
    };

    angular.extend(this, $controller('BaseCrudCtrl', { vm: vm, ctrlOpts }));

    // 编辑权限列表成为画面表示形式
    vm.permissionList = RoleSrv.convPermissionForView();
}

module.exports = {
    name: 'RoleNewCtrl',
    fn: RoleNewCtrl
};
