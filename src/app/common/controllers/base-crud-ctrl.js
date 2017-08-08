'use strict';

const _ = require('lodash');

/**
 * @class BaseCrudCtrl 控制器基类：增删改查的控制器
 * @alias module:common/controllers.BaseCrudCtrl
 *
 * @param $window
 * @param $state
 * @param $stateParams
 * @param $q
 * @param ApiSrv
 * @param {Object} vm 控制器的value model
 * @param {Object} ctrlOpts
 * @param {String} ctrlOpts.modelName 模型的名称
 * @param {Function} [ctrlOpts.preSaveFn] 保存前处理，如果返回false或者Promise.reject的话则不做保存
 * @param {Function} [ctrlOpts.postSaveFn] 保存后处理
 * @param {Function} [ctrlOpts.preGetDetailFn] 取得详情前处理
 * @param {Function} [ctrlOpts.postGetDetailFn]
 */
function BaseCrudCtrl($window, $state, $stateParams, $q, ApiSrv, MessageSrv, vm, ctrlOpts) {
    'ngInject';

    const actionMaps = {
        new: 'create',
        edit: 'update',
        delete: 'delete'
    };

    // 初始化
    (function init() {
        vm.model = {};

        // 取得当前处理的Action类别
        vm.action = _.last(_.split($state.current.name, '.'));

        vm.isDeleteAction = (vm.action === 'delete');
    })();

    // 取得一览页面的stage
    function _getListState() {
        return  'main.' + ctrlOpts.modelName + '.list';
    }

    /**
     * 取得详情
     *
     * 调用getDetail API，取得结果设置到vm.model中
     * 如果定义了ctrlOpts.preGetDetailFn，则在取得结果前会先调用该函数
     * 如果定义了ctrlOpts.postGetDetailFn，则在取得结果后会先调用该函数
     */
    vm.getDetail = function() {
        let apiParams = {};
        if (ctrlOpts.preGetDetailFn) {
            apiParams = ctrlOpts.preGetDetailFn(apiParams);
        } else {
            apiParams.id = $stateParams.id;
        }
        ApiSrv.exec(ctrlOpts.modelName + '/detail', apiParams)
            .then(function(data) {
                if (ctrlOpts.postGetDetailFn) {
                    vm.model = ctrlOpts.postGetDetailFn(data);
                }  else {
                    vm.model = data;
                }
            });
    };

    /**
     * 保存
     *
     * 根据当前画面的种类，调用create、update或delete API
     * 如果定义了ctrlOpts.preSaveFn，则在保存前会先调用该函数
     */
    vm.save = function() {
        function _confirmAndSave() {
            let apiAction = actionMaps[vm.action];
             // 确认保存后执行
            MessageSrv.confirm(`confirm.${apiAction}`).then(() => {
                ApiSrv.exec(`${ctrlOpts.modelName}/${apiAction}`, vm.model)
                .then(function() {
                    if (ctrlOpts.postSaveFn) {
                        ctrlOpts.postSaveFn();
                    } else {
                        MessageSrv.success(`message.${apiAction}Ok`);
                        vm.back();
                    }
                });
            });
        }

        // 前处理hook
        if (ctrlOpts.preSaveFn) {
            $q.when(ctrlOpts.preSaveFn()).then(result => {
                if (result === undefined || result) {
                    _confirmAndSave();
                }
            });
        } else {
            _confirmAndSave();
        }
    };

    vm.back = function() {
        if ($window.history.length > 1) {
            $window.history.back();
        } else {
            $state.go(_getListState());
        }
    };
}

module.exports = {
    name: 'BaseCrudCtrl',
    fn: BaseCrudCtrl
};
