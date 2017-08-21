'use strict';
/**
 * @class MessageSrv 消息服务
 * @alias module:common/services.MessageSrv
 *
 * @param $q
 * @param $uibModal
 * @param $translate
 * @param growl
 * @param MessageList
 */
function MessageSrv($q, $uibModal, $translate, growl, MessageList) {
    'ngInject';

    // 整理消息参数
    function _buildMessageParams(params) {
        if (params) {
            var messageParams = {};
            var paramsArr = Array.isArray(params) ? params : [params];
            for (var i = 0; i < paramsArr.length; i++) {
                messageParams['p' + i] = $translate.instant(paramsArr[i]);
            }
            return messageParams;
        } else {
            return null;
        }
    }

    // 显示消息
    function _showMessage(messageLevel, message, params) {
        let msgFn = growl[messageLevel];

        if (params) {
            let messageParams = _buildMessageParams(params);
            $translate(message, messageParams).then(function(translatedMessage) {
                msgFn.call(msgFn, translatedMessage);
            });
        } else {
            msgFn.call(msgFn, message);
        }
    }

    /**
     * @public
     * @method module:common/services.MessageSrv#getMessageParams 取得消息参数
     * @param  {String} params 消息参数
     */
    let _getMessageParams = function(params) {
        //参数不是json格式
        return _buildMessageParams(eval(params)); // jshint ignore:line
    };

    /**
     * @public
     * @method module:common/services.MessageSrv#confirm 弹出确认消息
     * @param  {String} msg 消息文本
     * @return {Promise}
     */
    let _confirm = function(msg) {
        let d = $q.defer();

        let modalInstance = $uibModal.open({
            template: `<div class="modal-header">
                           <div class="modal-title"><strong>确认</strong> </div>
                        </div>
                        <div class="modal-body" translate="{{message}}">
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" ng-click="$close()">确认</button>
                            <button class="btn btn-default" ng-click="$dismiss()">取消</button>
                        </div>`,
            controller: function($scope, message) {
                $scope.message = message;
            },
            resolve: {
                message: function() {
                    return msg;
                }
            }
        });

        modalInstance.result.then(function() {
            return d.resolve();
        }, function() {
            return d.notify();
        });

        return d.promise;
    };

    /**
     * 追加错误消息
     * @public
     * @method module:common/services.MessageSrv#error
     * @param  {String} message 消息KEY或消息文本
     * @param  {String[]} [params] 消息参数
     */
    let _error = function(message, params) {
        _showMessage('error', message, params);
    };

    /**
     * 追加提示消息
     * @public
     * @method module:common/services.MessageSrv#info
     * @param  {String} message 消息KEY或消息文本
     * @param  {String[]} [params] 消息参数
     */
    let _info = function(message, params) {
        _showMessage('info', message, params);
    };

    /**
     * 追加成功消息
     * @public
     * @method module:common/services.MessageSrv#success
     * @param  {String} message 消息KEY或消息文本
     * @param  {String[]} [params] 消息参数
     */
    let _success = function(message, params) {
        _showMessage('success', message, params);
    };

    /**
     * 取得系统消息
     * @public
     * @method module:common/services.MessageSrv#getMessage
     * @param  {String} message 消息KEY或消息文本
     * @param  {String[]} [params] 消息参数
     */
    let _getMessage = function(message, params) {
        let messageContent = MessageList[message];
        params = _getMessageParams(params);
        if (params) {
            if (params && params.length > 0) {
                for (let i = 0; i < params.length; i++) {
                    messageContent = messageContent.replace('{{p' + i.toString() + '}}', params[i]);
                }
            }
        }
        return messageContent;
    };

    return {
        confirm: _confirm,
        // 追加错误消息
        error: _error,
        // 追加正常消息
        info: _info,
        // 追加成功消息
        success: _success,
        // 取得系统消息
        getMessage: _getMessage,
        // 取得消息参数
        getMessageParams: _getMessageParams
    };
}

module.exports = {
    name: 'MessageSrv',
    fn: MessageSrv
};
