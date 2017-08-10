'use strict';
/**
 * @class BaseListCtrl 控制器基类：列表控制器
 * @alias module:common/controllers.BaseListCtrl
 *
 * @param $location
 * @param NgTableParams ng-table的实例
 * @param ApiSrv    API服务
 * @param tableSrv  表服务
 * @param {Object} vm  控制器的value model
 * @param {Object} ctrlOpts
 * @param {String} ctrlOpts.modelName 模型的名称
 * @param {String} ctrlOpts.dataUrl 扩展 api url
 * @param {Function} [ctrlOpts.preSearchFn] 检索前处理
 * @param {Function} [ctrlOpts.postSearchFn] 检索后处理
 * @param {Object} ctrlOpts.defaultCondition 默认检索条件
 *
 * @example
 *
 *  // 检索前处理
 *  function preSearchFn(apiParams) {
 *      console.log(apiParams);
 *  }
 *  // 检索后处理
 *  function postSearchFn(list) {
 *      console.log(list);
 *  }
 *  // 扩展自list控制器基类
 *  let ctrlOpts = {
 *          modelName: 'adminRole',
 *          preSearchFn: preSearchFn,
 *          postSearchFn: postSearchFn,
 *          dataUrl: 'getDetail',
 *          defaultCondition: 'defaultCondition',
 *          defaultSortCols: Object 可选 默认排序列
 *      };
 *  angular.extend(this, $controller('BaseListCtrl', { vm: vm, ctrlOpts: ctrlOpts }));
 */
function BaseListCtrl($location, NgTableParams, ApiSrv, TableSrv, vm, ctrlOpts) {
    'ngInject';

    let tableSrv;

    // 检索
    vm.search = function() {
        vm.tableParams.page(1);
        vm.tableParams.reload();
    };

    // 重置
    vm.reset = function() {
        if (ctrlOpts.defaultCondition) {
            vm.searchCondition = angular.copy(ctrlOpts.defaultCondition);
        } else {
            vm.searchCondition = angular.copy({});
        }

        tableSrv.reset(vm.searchCondition);
        vm.search();
    };

    // 取得当前索引
    vm.getIndex = function(index) {
        return (vm.tableParams.page() - 1) * vm.tableParams.count() + index + 1;
    };

    // 初始化
    (function init() {
        if (ctrlOpts.defaultCondition) {
            vm.searchCondition = angular.copy(ctrlOpts.defaultCondition);
        } else {
            vm.searchCondition = {};
        }
        let getDataUrl;
        if (ctrlOpts.dataUrl) {
            getDataUrl = ctrlOpts.modelName + ctrlOpts.dataUrl;
        } else {
            getDataUrl = ctrlOpts.modelName + '/list';
        }
        tableSrv = new TableSrv({
            searchCondition: vm.searchCondition,
            getDataUrl: getDataUrl,
            preSearchFn: ctrlOpts.preSearchFn,
            postSearchFn: ctrlOpts.postSearchFn,
            defaultSortCols: ctrlOpts.defaultSortCols
        });
        vm.tableParams = tableSrv.create();
    })();
}

/**
 * BaseListCtrl 基础一览控制器
 */
module.exports = {
    name: 'BaseListCtrl',
    fn: BaseListCtrl
};
