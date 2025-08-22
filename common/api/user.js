/**
 * 登录
 */
export const login = (params, config = {}) => uni.$uv.http.post('/login/index', params, config)

/**
 * 获取用户信息
 */
export const getUserInfo = (data) => uni.$uv.http.get('/getUserInfo', data)