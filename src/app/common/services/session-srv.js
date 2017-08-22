'use strict';

/**
 * @class SessionSrv Session相关服务
 * @alias module:common/services.SessionSrv
 *
 * @param localStorageService
 * @param AppConfig 系统配置项
 */
function SessionSrv(localStorageService, AppConfigs) {
    'ngInject';

    const KEY_CURRENT_USER = 'ADMIN_CURRENT_USER';

    let _currentUser;

    /**
     * 保存当前用户
     * @method module:common/services.SessionSrv#saveCurrentUser
     * @param {Object} user 当前用户
     */
    let _saveCurrentUser = function(user) {
        if (user) {
            _currentUser = user;
            localStorageService.set(KEY_CURRENT_USER, user);
        }
    };

    /**
     * 清楚当前用户
     * @method module:common/services.SessionSrv#clearCurrentUser
     */
    let _clearCurrentUser = function() {
        localStorageService.remove(KEY_CURRENT_USER);
        localStorageService.remove(AppConfigs.USER_TOKEN_KEY);
        _currentUser = null;
    };

    /**
     * 取得当前用户
     * @method module:common/services.SessionSrv#getCurrentUser
     * @return {Object} 当前用户
     */
    let _getCurrentUser = function() {
        if (!_currentUser) {
            _currentUser = localStorageService.get(KEY_CURRENT_USER);
        }
        return _currentUser;
    };

    return {
        saveCurrentUser: _saveCurrentUser,
        clearCurrentUser: _clearCurrentUser,
        getCurrentUser: _getCurrentUser
    };
}

module.exports = {
    name: 'SessionSrv',
    fn: SessionSrv
};
