/**
 * 控制器：用户登陆
 */
'use strict';

function SessionLoginCtrl($state, ApiSrv, SessionSrv) {
    'ngInject';

    let vm = this;

    // 用户登陆
    vm.login = function() {
        ApiSrv.exec('session/login', vm.user)
            .then(function(user) {
                // 保存用户信息到storeage
                SessionSrv.saveCurrentUser(user);

                // 跳转到首页
            	$state.go('main.welcome');
            });
    };
}

module.exports = {
    name: 'SessionLoginCtrl',
    fn: SessionLoginCtrl
};
