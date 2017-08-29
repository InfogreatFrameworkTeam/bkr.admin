'use strict';


/**
 * @class UploadItems 上传文件的展示
 * @alias module:common/directives.UploadItems
 * @return {Directive}
 */

function UploadItems(FileSrv) {
    'ngInject';

    // 模板
    let _template =
        `
        <div class="uploadItem" ng-repeat="uploadItem in uploader.queue">
            <div class="progress upload-progress" ng-show="uploadItem.isUploading">
                <div class="progress-bar" role="progressbar" ng-style="{ 'width': uploadItem.progress + '%' }"></div>
             </div>
             <div class="uploadItem-img-wrapper" ng-if="uploadItem.isSuccess">
                <div class="uploadItem-remove">
                    <a class="fa fa-remove" href="" ng-click="uploadItem.remove()"></a>
                </div>
                <img class="uploadItem-image img-responsive" ng-src="{{uploadItem.result.url}}" ng-if="vmUploadItem.isImage(uploadItem)">
                <p class="uploadItem-fileName" ng-bind="vmUploadItem.getFileName(uploadItem)" ng-if="!vmUploadItem.isImage(uploadItem)">
             </div>
        </div>
        `;

    function UploadItemController() {
        let vm = this;
        vm.getFileName = function(fileItem) {
            return FileSrv.getFileName(fileItem.result.url);
        };
        vm.isImage = function(fileItem) {
            return FileSrv.isImageFile(fileItem.result.url);
        };
    }
    UploadItemController.$inject = ['$scope'];

    // 指令返回
    let directive = {
        restrict: 'A',
        scope: {
            uploader: '=uploadItems'
        },
        controller: UploadItemController,
        controllerAs: 'vmUploadItem',
        template: _template
    };
    return directive;
}

module.exports = {
    name: 'uploadItems',
    fn: UploadItems
};
