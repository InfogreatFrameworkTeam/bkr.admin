'use strict';

/**
 * @class OnRun APP首次启动时的初始化
 * @alias module:start.OnRun
 */
function OnRun($rootScope, $state, SessionSrv, CodeList, MultiselectTranslationTexts) {
	'ngInject';

	let LOGIN_STATE = 'login';

    $rootScope.codelist = CodeList;

    /**
     * 监听路由状态变化
     */
    function _watchStateChange() {
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            let currentUser = SessionSrv.getCurrentUser();
            if ((!toState.isAnon) && !currentUser && toState.name !== LOGIN_STATE) {
                e.preventDefault();
                $state.go(LOGIN_STATE);
            }
        });
    }

    // 监听路由状态变化
    _watchStateChange();

    // 多选下拉框的翻译文本
    $rootScope.multiselectTranslationTexts = MultiselectTranslationTexts;
}

module.exports = OnRun;
