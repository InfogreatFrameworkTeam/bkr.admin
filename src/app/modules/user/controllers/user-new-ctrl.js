/**
 * 控制器：用户新增
 */
'use strict';

function UserNewCtrl($controller, UploadSrv) {
    'ngInject';

    let vm = this;

    let ctrlOpts = {
            modelName: 'user'
        };
    angular.extend(this, $controller('BaseCrudCtrl', { vm: vm, ctrlOpts }));

    vm.uploader = UploadSrv.createImageUploader('user-profile', {
        fileLimit: 1
    });
}

module.exports = {
    name: 'UserNewCtrl',
    fn: UserNewCtrl
};
