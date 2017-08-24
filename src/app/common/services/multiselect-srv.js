'use strict';

let _ = require('lodash');

/**
 * @class MultiselectSrv 多选框组件相关服务
 * @alias module:common/services.MultiselectSrv
 */
function MultiselectSrv() {
    'ngInject';

    /**
     * vm中的已选项（对象数组格式）
     * @method module:common/services.MultiselectSrv#toApi
     * @description 将选择的内容转换成API需要的格式
     * @return {Array} API用的已选列表（字符串数组格式）
     */
    let _toApi = function(listForVm) {
        if (listForVm && listForVm.length > 0) {
            return _.map(listForVm, item => item.id);
        } else {
            return null;
        }
    };

    /**
     * 将选择的内容转换成API需要的格式
     * @method module:common/services.MultiselectSrv#toVm
     * @param {Array} listForSearch searchCondition中的一选项（字符串数组格式）
     * @return {Array} 画面表示用的已选列表（对象数组格式）
     */
    let _toVm = function(listForSearch) {
	    let listForVm = [];
	    if (listForSearch) {
	        listForVm = _.map(listForSearch, (item) => ({
	            id: item
	        }));
	    }
	    return listForVm;
    };

    return {
        toApi: _toApi,
        toVm: _toVm
    };
}

module.exports = {
    name: 'MultiselectSrv',
    fn: MultiselectSrv
};
