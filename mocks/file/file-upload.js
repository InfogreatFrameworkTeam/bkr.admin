/**
 * mock for 文件上传
 * @type {Object}
 *
 * params: none
 */
module.exports = {
    '/api/file/upload': {
        POST: {
            data: {
                status: 1,
                result: {
                    id: '1',
                    url: '/images/tmp/test_upload.jpg'
                }
            }
        }
    }
};
