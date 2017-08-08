/**
 * 控制器：用户编辑
 */
'use strict';

function UserEditCtrl($controller) {
    'ngInject';

    let vm = this;

    let ctrlOpts = {
            modelName: 'user'
        };
    angular.extend(this, $controller('BaseCrudCtrl', { vm: vm, ctrlOpts}));

    vm.getDetail();
}

module.exports = {
    name: 'UserEditCtrl',
    fn: UserEditCtrl
};
