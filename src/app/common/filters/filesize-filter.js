'use strict';

/**
 * @class FileSizeFilter 文件大小过滤器, 将文件大小从数值转换为可读的文字
 * @alias module:common/filters.FileSizeFilter
 *
 * @param {int} size 文件大小
 *
 * @example
 *   file.size = 1024;
 *   // 1Bytes;
 *   {{ file.size | fileSize}}
 */
function FileSizeFilter() {
    'ngInject';
    return function(size) {
        if (isNaN(size)) {
            size = 0;
        }

        if (size < 1024) {
            return size + ' Bytes';
        }

        size /= 1024;

        if (size < 1024) {
            return size.toFixed(2) + ' Kb';
        }

        size /= 1024;

        if (size < 1024) {
            return size.toFixed(2) + ' Mb';
        }

        size /= 1024;

        if (size < 1024) {
            return size.toFixed(2) + ' Gb';
        }

        size /= 1024;

        return size.toFixed(2) + ' Tb';
    };
}

module.exports = {
    name: 'fileSize',
    fn: FileSizeFilter
};
