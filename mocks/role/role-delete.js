/**
 * mock for 角色删除
 * @type {Object}
 *
 * params:
 * {id: "1"}
 */
module.exports = {
    '/api/role/delete': {
        POST: {
            data: {
                status: 1
            }
        }
    }
};
