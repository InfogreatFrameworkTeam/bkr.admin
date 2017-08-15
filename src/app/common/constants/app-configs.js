'use strict';

/**
 * @class AppConfigs APP配置项
 * <p>环境相关的配置在build/buildConfig.json下</p>
 * @alias module:common/constants.AppConfigs
 */
let AppConfigs = {
    /** 当前环境: dev、test、production */
	ENV: '${ENV}',
    /** API的基础路径 */
	API_BASE_URL: '${API.BASE}/api/',
    /** 用户Token的key */
	USER_TOKEN_KEY: 'x-access-token'
};

module.exports = {
     name: 'AppConfigs',
     fn: AppConfigs
};
