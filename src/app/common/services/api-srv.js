'use strict';

/**
 * @class ApiSrv API服务
 * @alias module:common/services.ApiSrv
 *
 * @param $q
 * @param $http
 * @param $httpParamSerializer
 * @param $state
 * @param localStorageService
 * @param AppConfigs           配置项
 * @param CommonConstants      共同常数
 * @param MessageSrv           消息服务
 * @param DateSrv              日期服务
 * @param SessionSrv           Session服务
 */
function ApiSrv($q, $http, $httpParamSerializer, $state, localStorageService, AppConfigs, CommonConstants, MessageSrv, DateSrv, SessionSrv) {
    'ngInject';

    const TOKEN_KEY = AppConfigs.USER_TOKEN_KEY;
    const API_SUCCESSED = '1';

    /**
     * 请求是否成功
     * @method module:common/services.ApiSrv#isSuccess
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

    /**
     * API执行
     * @method module:common/services.ApiSrv#exec
     * @param  {String} url     URL
     * @param  {Object} params  API参数
     * @param  {Object} [options]
     * @param  {String} [options.method] API方法，默认为POST
     * @return {Promise}        response promise
     * @example
     * ApiSrv.exec('user/changeDepartment', apiParams)
            .then(function(data) {
                // ... 成功处理
            }).catch(function(reson) {
                // ... 错误处理，一般不需要
            });
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
                console.log(res);
            }

            // 设置token
            let accessToken = res.headers(TOKEN_KEY);
            if (accessToken) {
                localStorageService.set(TOKEN_KEY, accessToken);
            }

            // 处理返回结果
            let isJson = res.headers('content-type').match(/json/);
            if (isJson) {
                if (isResponseSuccess(res.data)) {
                    // result ok
                    if (res.data.message) {
                        MessageSrv.success(res.data.message);
                    }
                    return d.resolve(res.data.result);
                } else {
                    // result error
                    _showError(res.data);

                    return d.reject(res.data);
                }
            } else {
                return d.resolve(res.data);
            }
        }

        // 失败回调
        function _errorFn(res) {
            let data = res.data || {};

            // 权限相关错误时，跳回Login画面
            if (res.status === 403) {
                SessionSrv.clearCurrentUser();
                MessageSrv.error('error.auth');
                $state.go(CommonConstants.loginState);
            } else {
                // 显示系统异常
                if (!_showError(data)) {
                    MessageSrv.error('error.system.error');
                }
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
            req.headers[TOKEN_KEY] = localStorageService.get(TOKEN_KEY);
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

    return {
        exec,
        isResponseSuccess
    };
}

module.exports = {
    name: 'ApiSrv',
    fn: ApiSrv
};
