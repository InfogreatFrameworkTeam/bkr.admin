/**
 * mock for 用户删除
 * @type {Object}
 */
module.exports = {
    '/api/user/delete': {
        POST: {
            data: {
                status: 1,
                message: '删除用户成功！'
            }
        }
    }
};
