'use strict';

/**
 * @class TranslateLoader 用于加载翻译文本
 * @alias module:common/services.TranslateLoader
 *
 * @param $rootScope
 * @param $q
 * @param {object} MessageList 消息一览
 */
function TranslateLoader($rootScope, $q, MessageList) {
    'ngInject';

    function _loader() {
        let d = $q.defer();

        d.resolve(MessageList);

        return d.promise;
    }

    return _loader;
}

module.exports = {
    name: 'TranslateLoader',
    fn: TranslateLoader
};
