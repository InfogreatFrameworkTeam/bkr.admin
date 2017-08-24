'use strict';
const _ = require('lodash');

const POSTFIX_CONTROLLER = 'ctrl';
const POSTFIX_ROUTER = 'routers';
const POSTFIX_SERVICES = 'srv';
const POSTFIX_CONSTANTS = 'constants';

/**
 * angular模块用工具集
 * @module base/angular/utils/moduleUtils
 */

 /**
 * 导入modules目录下的所有模块
 * @param  {String} moduleName  模块名称
 * @param  {Object} moduleItems 模块内文件
 * @return {Object}             angularjs的模块
 */
exports.importModule = function(moduleName, moduleItems) {
	function _getItemCatagory(key) {
	    let arr = _.split(key, '-');
	    if (arr.length === 1) {
	        return '';
	    } else {
	        return _.last(_.split(key, '-'));
	    }
	}

	function _declare(appModules, moduleItems) {
	    for (let key in moduleItems) {
	        let item = moduleItems[key];

	        if (!item) {
	            return;
	        }

	        let catagory = _getItemCatagory(key);
	        if (catagory === POSTFIX_CONTROLLER) {
	            appModules.controller(item.name, item.fn);
	        } else if (catagory === POSTFIX_ROUTER) {
	            appModules.config(item);
	        } else if (catagory === POSTFIX_SERVICES) {
	            appModules.factory(item.name, item.fn);
	        } else if (catagory === POSTFIX_CONSTANTS) {
	        } else {
	            _declare(appModules, item);
	        }
	    }
	}

    let appModules = angular.module(moduleName, []);

    _declare(appModules, moduleItems);

    return appModules;
};
