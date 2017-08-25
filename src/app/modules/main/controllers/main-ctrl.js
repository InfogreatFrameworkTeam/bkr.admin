/**
 * 控制器：主画面
 */
'use strict';

function MainCtrl() {
	'ngInject';

	let vm = this;

    vm.isFullScreen = false;

    /**
     * 切换全屏幕显示
     */
    vm.toggleFullScreen = function() {
        vm.isFullScreen = !vm.isFullScreen;
    };
}

module.exports = {
    name: 'MainCtrl',
    fn: MainCtrl
};
