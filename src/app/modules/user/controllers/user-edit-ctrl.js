/**
 * 控制器：用户编辑
 */
'use strict';

function UserEditCtrl($controller, UploadSrv) {
    'ngInject';

    let vm = this;

    // 初始化上传组件
    vm.uploader = UploadSrv.createImageUploader({
        fileLimit: 1
    });

    // 检索后处理
    function postGetDetailFn(result) {
        // 将已有的照片添加到上传组件中
        if (result.photo) {
            vm.uploader.addUploadedFiles(result.photo);
        }
        return result;
    }

    let ctrlOpts = {
            modelName: 'user',
            postGetDetailFn
        };
    angular.extend(this, $controller('BaseCrudCtrl', { vm: vm, ctrlOpts}));

    vm.getDetail();

    vm.uploader = UploadSrv.createImageUploader('user-profile', {
        fileLimit: 1
    });
}

module.exports = {
    name: 'UserEditCtrl',
    fn: UserEditCtrl
};
