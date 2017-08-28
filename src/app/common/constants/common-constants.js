'use strict';
/**
 * 共通定数
 * @namespace CommonConstant
 * @memberOf module:common/constants
 */
let CommonConstants =
/** @lends module:common/constants.CommonConstant */
{
    /** Login的route state */
    loginState: 'login',
    /** 日期格式 */
    dateFormat: 'YYYY-MM-DD',
    /** 图片后缀 */
    imageSuffixes: ['jpg', 'jpeg', 'png', 'gif', 'bmp']
};

module.exports = {
    name: 'CommonConstants',
    fn: CommonConstants
};
