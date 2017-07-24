'use strict';

let _ = require('lodash');

/**
 * @class ApiSrv API服务
 * @alias module:common/services.ApiSrv
 *
 * @param $q
 * @param $http
 * @param $httpParamSerializer
 * @param $cookie
 * @param $state
 * @param AppConfigs           配置项
 * @param MessageSrv           消息服务
 */
function ApiSrv($q, $http, $httpParamSerializer, $state, AppConfigs, MessageSrv, DateSrv, SessionSrv, CommonConstants) {
    'ngInject';

    const TOKEN_KEY = AppConfigs.USER_TOKEN_KEY;
    const API_SUCCESSED = '1';

    /**
     * @method module:common/services.ApiSrv#exec API执行
     * @param  {String} url     URL
     * @param  {Object} params  API参数
     * @param  {Object} [options]
     * @param  {String} [options.method] API方法，默认为POST
     * @return {Promise}        response promise
     */
    function exec(url, params, options) {
        let d = $q.defer();

        function _showError(data) {
            if (data.errorMsg) {
                MessageSrv.error(data.errorMsg);
            } else if (data.errorType) {
                MessageSrv.error(data.errorType);
            } else {
                return false;
            }
            return true;
        }

        // 成功回调
        function _successFn(res) {
            if (AppConfigs.ENV !== 'production') {
                console.info('API调用完了:' + res.config.url);
                console.log(_.cloneDeep(res));
            }

            // 设置token
            let accessToken = res.headers(TOKEN_KEY);
            if (accessToken) {
                localStorage.setItem(TOKEN_KEY, accessToken);
            }

            // 处理返回结果
            let isJson = res.headers('content-type').match(/json/);
            if (isJson) {
                let status = res.data.status + '';
                if (status === API_SUCCESSED) {
                    // result ok
                    if (res.data.message) {
                        MessageSrv.success(res.data.message);
                    }
                    return d.resolve(res.data.result);
                } else {
                    // result error
                    _showError(res.data);

                    // // 权限相关错误时，跳回Login画面
                    // if (status === API_AUTH_ERR) {
                    //     SessionSrv.clearCurrentUser();
                    //     $state.go(CommonConstants.loginState);
                    // }

                    return d.reject(res.data);
                }
            } else {
                return d.resolve(res.data);
            }
        }

        // 失败回调
        function _errorFn(res) {
            let data = res.data || {};
            if (!_showError(data)) {
                MessageSrv.error('error.system.error');
            }
            if (AppConfigs.ENV === 'dev') {
                console.error('API调用失败:' + res.config.url);
                console.error(res);
            }
            d.reject(res);
        }

        // prepare request
        options = options || {};
        params = params || {};


        // 将日期型参数都格式化为日期字符串
        DateSrv.convertDatesToDateStrings(params);

        // 转换URL
        let fullUrl = url.startsWith('http') ? url : AppConfigs.API_BASE_URL + url;

        // 设置请求
        let req = {
            method: options.method || 'POST',
            url: fullUrl
        };
        if (req.method === 'POST') {
            req.data = params;
        } else {
            req.params = params;
        }
        // 设置Token
        if (SessionSrv.getCurrentUser()) {
            req.headers = {};
            req.headers[TOKEN_KEY] = localStorage.getItem(TOKEN_KEY);
        }

        // 打印API参数
        if (AppConfigs.ENV !== 'production') {
            console.info('API调用开始:' + req.url);
            console.log(req);
        }

        // execute request
        $http(req)
            .then(_successFn)
            .catch(_errorFn);
        return d.promise;
    }

    /**
     * @method module:common/services.ApiSrv#isSuccess 请求是否成功
     * @param  {Object} res  Response
     * @return {boolean}
     */
    function isResponseSuccess(res) {
        // 处理返回结果
        if (res.status + '' === API_SUCCESSED) {
            return true;
        } else {
            return false;
        }
    }

    return {
        exec,
        isResponseSuccess
    };
}

module.exports = {
    name: 'ApiSrv',
    fn: ApiSrv
};
