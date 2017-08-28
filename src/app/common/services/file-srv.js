'use strict';

/**
 * @class FileSrv 文件服务
 * @alias module:common/services.FileSrv
 */
function FileSrv(CommonConstants) {
    'ngInject';

    /**
     * 从文件路径中获取文件名
     * @method module:common/services.FileSrv#getFileName
     * @param  {String} fullPath 文件完整路径
     * @return {String} 文件名
     */
    let getFileName = function(fullPath) {
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            return filename;
        }
        return null;
    };

     /**
     * 从文件路径中获取文件扩展名
     * @method module:common/services.FileSrv#getFileSuffix
     * @param  {String} fullPath 文件完整路径
     * @return {String} 文件扩展名
     */
    let getFileSuffix = function(fullPath) {
        if (fullPath) {
            var startIndex = fullPath.indexOf('.');
            startIndex = startIndex == 0 ? 0 : startIndex + 1;
            var suffix = fullPath.substring(startIndex);
            return suffix;
        }
        return null;
    };

     /**
     * 从文件路径中的文件名后追, 判断是否是图片
     * @method module:common/services.FileSrv#isImageFile
     * @param  {String} fullPath 文件完整路径
     * @return {boolean} 是否是图片
     */
    let isImageFile = function(fullPath) {
        var suffix = getFileSuffix(fullPath);
        if (suffix) {
            return CommonConstants.imageSuffixes.includes(suffix);
        }
        return false;
    };


    return {
        getFileName,
        getFileSuffix,
        isImageFile
    };
}

module.exports = {
    name: 'FileSrv',
    fn: FileSrv
};
