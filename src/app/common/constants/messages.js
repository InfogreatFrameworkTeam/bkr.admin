'use strict';
let MessageList = {
	'error.system.error': '发生系统错误',
	'error.required': '请输入{{p0}}。',
	'error.url': '请输入正确格式的网址!',
	'error.email': '请输入正确的{{p0}}。',
	'error.number': '{{p0}}必须是数字。',
	'error.minlength': '最小长度不正确。',
	'error.maxlength': '超过了最大长度。',
	'error.alphaNumber': '请输入英文或数字。',
    'error.fileUpload': '文件上传时发生错误，请重新上传。',
    'error.fileExtension': '只能上传以下扩展名的文件{{p0}}',
    'error.fileSize': '只能上传不大于{{p0}}的文件',
    'error.fileLimit': '只能上传不超过{{p0}}个文件',
	'confirm.update': '确定要更新吗？',
	'confirm.create': '确定要新建吗？',
	'confirm.save': '确定要保存吗？',
	'confirm.delete': '确定要删除吗？',
	'confirm.logout': '确定要退出吗？',
	'message.updateOk': '更新成功',
	'message.saveOk': '保存成功',
	'message.createOk': '新建成功',
	'message.deleteOk': '删除成功',
};

module.exports = {
    name: 'MessageList',
    fn: MessageList
};
