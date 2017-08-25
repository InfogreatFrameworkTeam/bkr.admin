'use strict';

const IMAGE_SUFFIXS = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
const DEFAULT_SIZE_LIMIT = 5 * 1024 * 1024;
const DEFAULT_FILE_LIMIT = 5;
const DEFAULT_UPLOAD_URL = 'file/upload';

/**
 * @class UploadSrv 上传服务
 * @alias module:common/services.UploadSrv
 */
function UploadSrv($rootScope, FileUploader, FileItem, ApiSrv, MessageSrv, AppConfigs) {
    'ngInject';

    /**
     * 创建上传组件
     * @method module:common/services.UploadSrv#createUploader     *
     * @param  {Object} fileParams  上传文件参数
     * @param  {String} fileParams.fileType  参考012文件上传分类汇总中的序号
     * @param  {String} [fileParams.targetId]  目标对象ID
     * @param  {Object} [opts]  可选参数
     * @param  {function} [opts.postCompleteItem]   上传文件成功后回调
     * @param  {boolean} [opts.imageOnly]   仅可上传图片文件   default false
     * @param  {boolean} [opts.sizeLimit]   上传文件的大小显示 default 5m
     * @param  {boolean} [opts.fileLimit]   上传文件的个数限制 default 5
     * @param  {boolean} [opts.isForCkeditor]   是否是Ckeditor上传 default false
     *
     * @example
     *      vm.uploader = UploadSrv.createImageUploader({fileType: 1});
     *      let uploadFiles = vm.uploader.getUploadedFiles();
     *
     * @return {Object} uploader 参考angular-file-uploader
     */
    let createUploader = function(fileParams, opts) {
        let uploader;
        opts = opts || {};

        // 扩展上传组件的方法
        function _extendUploader() {
            // 取得上传的文件
            uploader.getUploadedFile = function() {
                let uploadedFiles = uploader.getUploadedFiles();
                if (uploadedFiles && uploadedFiles.length > 0) {
                    return  uploadedFiles[0];
                } else {
                    return null;
                }
            };

            // 取得上传的文件数组
            uploader.getUploadedFiles = function() {
                return uploader.queue.map((item) => item.result);
            };

            // 取得上传的文件ID数组
            uploader.getUploadedFileIDs = function() {
                return uploader.queue.map((item) => item.result.id);
            };

            // 加入已上传的文件
            // files可以是数组或者是单个文件 { id, url}
            uploader.addUploadedFiles = function(files) {
                files = Array.isArray(files) ? files : [files];
                files.forEach(function(file) {
                    let ft = new FileItem(uploader, {});
                    ft.result = file;
                    ft.isSuccess = true;
                    uploader.queue.push(ft);
                });
            };
        }

        // 选择文件后事件
        function _onAfterAddingFile(item) {
            // _getFileSign(item).then(function(result) {
            //     item.url = result.host;
            //     let formData = {
            //         'key': result.key,
            //         'policy': result.policy,
            //         'OSSAccessKeyId': result.accessid,
            //         'success_action_status': '200', //让服务端返回200,不然，默认会返回204
            //         'callback': result.callback,
            //         'signature': result.signature
            //     };
            //     item.formData.push(formData);

            //     item.upload();
            // });
            item.upload();
        }

        // 上传完成组件
        function _onCompleteItem(item, res) {
            if (AppConfigs.ENV !== 'production') {
                console.log('文件上传完成。', res);
            }
            if (ApiSrv.isResponseSuccess(res)) {
                if (opts.postCompleteItem) {
                    opts.postCompleteItem(item, res);
                }
                item.result = res.result;

                // Ckeditor上传时，回写图片URL
                if (opts.isForCkeditor) {
                    let ckDialog = (window.parent.CKEDITOR.dialog.getCurrent());
                    ckDialog.selectPage('info');
                    ckDialog.getContentElement('info', 'txtUrl').focus();
                    ckDialog.setValueOf('info', 'txtUrl', item.result.url);
                }
            } else {
                MessageSrv.error('error.fileUpload');
            }
        }

        // 增加扩展名过滤器
        function _addSuffixsFilter(suffixs, uploader) {
            if (suffixs) {
                uploader.filters.push({
                    name: 'suffixs',
                    fn: function(item) {
                        if (!Array.isArray(suffixs)) {
                            suffixs = [suffixs];
                        }
                        let itemNameUpper = item.name.toUpperCase();
                        for (let i = 0; i < suffixs.length; i++) {
                            if (itemNameUpper.endsWith(suffixs[i].toUpperCase())) {
                                return true;
                            }
                        }

                        let suffixsStr = '';
                        if(suffixs && suffixs.length > 0){
                            for (let i = 0; i < suffixs.length; i++) {
                                suffixsStr += suffixs[i];
                                if(i !== suffixs.length - 1){
                                    suffixsStr += ',';
                                }
                            }
                        }
                        MessageSrv.error('error.fileExtension', suffixsStr);
                        return false;
                    }
                });
            }
        }

        // 增加文件大小过滤器
        function _addSizeFilter(fileSize, uploader) {
            if (fileSize) {
                uploader.filters.push({
                    name: 'fileSize',
                    fn: function(item) {
                        if (item.size <= fileSize) {
                            return true;
                        }
                        let size = (Math.round(fileSize * 100 / (1024 * 1024)) / 100) + 'M';
                        MessageSrv.error('error.fileSize', size);
                        return false;
                    }
                });
            }
        }

        // 增加文件个数过滤器
        function _addCountFilter(fileLimit, uploader) {
            uploader.filters.push({
                name: 'fileLimit',
                fn: function() {
                    if (uploader.queue.length < fileLimit) {
                        return true;
                    }
                    if (fileLimit === 1) {
                        uploader.clearQueue();
                        $rootScope.$apply();
                        return true;
                    } else {
                        MessageSrv.error('error.fileLimit', fileLimit);
                        return false;
                    }
                }
            });
        }

        // ckeditor扩展
        function _extendCkeditor() {
            $rootScope.$on('onCkFileAdded', function(e, data) {
                uploader.addToQueue(data);
            });
        }

        // 创建上传组件
        uploader = new FileUploader({
            url: AppConfigs.API_BASE_URL + DEFAULT_UPLOAD_URL,
            onAfterAddingFile: _onAfterAddingFile,
            onCompleteItem: _onCompleteItem,
        });

        // 是否只能上传图片，如果是则加载后缀名过滤
        if (opts.imageOnly) {
            _addSuffixsFilter(IMAGE_SUFFIXS, uploader);
        }

        // 文件大小过滤
        let fileSizeLimit = opts.sizeLimit || DEFAULT_SIZE_LIMIT;
        _addSizeFilter(fileSizeLimit, uploader);

        // 文件个数过滤
        let fileCountLimit = opts.fileLimit || DEFAULT_FILE_LIMIT;
        _addCountFilter(fileCountLimit, uploader);

        // 扩展上传组件
        _extendUploader();

        // 如果是Ckeditor中的上传， 扩展
        if (opts.isForCkeditor) {
            _extendCkeditor();
        }

        return uploader;
    };

    /**
     * 创建上传图片组件
     * @method module:common/services.UploadSrv#createImageUploader
     */
    let createImageUploader = function(fileParams, opts) {
        opts = opts || {};
        opts.imageOnly = true;
        return createUploader(fileParams, opts);
    };

    /**
     * 创建上传图片组件
     * @method module:common/services.UploadSrv#createCkUploader
     */
    let createCkUploader = function(fileParams, opts) {
        opts = opts || {};
        opts.isForCkeditor = true;
        return createUploader(fileParams, opts);
    };

    return {
        createUploader,
        createImageUploader,
        createCkUploader
    };
}

module.exports = {
    name: 'UploadSrv',
    fn: UploadSrv
};
