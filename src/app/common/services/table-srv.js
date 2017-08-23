'use strict';

const _ = require('lodash');
const qs = require('qs');

const PAGE_PARAM_KEYS = ['page', 'count'];

/**
 * @class TableSrv Table相关服务
 * @alias module:common/services.TableSrv
 *
 * @param {String}   getDataUrl 检索API的URL
 * @param {Object}   [opts] 配置项目
 * @param {Object}   [opts.searchCondition] 检索条件
 * @param {Function} [opts.getDataFn] 执行检索时的自定义处理
 * @param {Function} [opts.preSearchFn] 检索前处理
 * @param {Function} [opts.postSearchFn] 检索后处理, 参数: data 检索结果
 * @param {boolean}  [opts.isNoHistory] 是否不保存检索条件到URL
 * @param {Object}   [opts.defaultSortCols] 默认排序列
 * @param {int}      [opts.defaultCount] 默认一页的件数
 *
 * @example
 *     vm.tableParams = new TableSrv({
 *       searchCondition: vm.searchCondition,
 *       getDataUrl: 'user/list'
 *     }).create();
 * @return {NgTableParamsExt}
 */
function TableSrv($location, NgTableParams, ApiSrv, MessageSrv, DateSrv) {
    'ngInject';

    class NgTableParamsExt {
        constructor(opts = {}) {
            this.opts = opts;
            let queryStringObj = opts.isNoHistory ? {} : qs.parse($location.search());
            this.sortCols = queryStringObj.sortCols || opts.defaultSortCols || {};
            let urlWithoutPageParams = _.omit(queryStringObj, PAGE_PARAM_KEYS);
            // 将日期字符串都转换为日期型
            urlWithoutPageParams = DateSrv.convertDateStringsToDates(urlWithoutPageParams);
            _.assignIn(this.opts.searchCondition, urlWithoutPageParams);
            this.firstLoad = true;
        }

        /**
         * 创建NgTableParams的实例
         * @method module:common/services.TableSrv#create
         * @return {NgTableParams} NgTableParams的实例
         */
        create() {
            // 取得数据的处理
            let getDataDefine = function(extInstance) {
                return function(params) {
                    let pageParams = _.pick(params.url(), PAGE_PARAM_KEYS);
                    let apiParams = angular.merge({}, pageParams, extInstance.opts.searchCondition);
                    // 排序
                    let sortCols = params.sorting();
                    if (!_.isEmpty(sortCols)) {
                        apiParams.sortCols = sortCols;
                    }

                    // 判断是否有自定义处理
                    if (extInstance.opts.getDataFn) {
                        return extInstance.opts.getDataFn(params, apiParams);
                    } else {
                        // 查询前处理
                        if (extInstance.opts.preSearchFn) {
                            extInstance.opts.preSearchFn(apiParams);
                        }
                        // 保持查询参数到URL
                        if (!extInstance.firstLoad && !extInstance.opts.isNoHistory) {
                            $location.search(qs.stringify(apiParams));
                        }
                        extInstance.firstLoad = false;
                        // ajax取数据
                        return ApiSrv.exec(extInstance.opts.getDataUrl, apiParams)
                            .then(function(data) {
                                if (data && data.list && data.list.length > 0) {
                                    params.total(data.count);
                                    if (extInstance.opts.postSearchFn) {
                                        extInstance.opts.postSearchFn(data);
                                    }
                                    return data.list;
                                } else {
                                    MessageSrv.info('INF_COM_NO_SEARCH_RESULT');
                                    return null;
                                }
                            });
                    }
                };
            };

            // 返回实例
            let tableParamInfo = {
                page: 1,
                sorting: this.sortCols
            };
            if  (this.opts.defaultCount) {
                tableParamInfo.count = this.opts.defaultCount;
            }
            return new NgTableParams(
                angular.extend(tableParamInfo, $location.search()), {
                    getData: getDataDefine(this)
                });
        }

        /**
         * 重置检索条件
         * @method module:common/services.TableSrv#reset
         * @param  {Object} searchCondition 检索条件
         */
        reset(searchCondition) {
            this.opts.searchCondition = searchCondition;
        }
    }

    return NgTableParamsExt;
}

module.exports = {
    name: 'TableSrv',
    fn: TableSrv
};
