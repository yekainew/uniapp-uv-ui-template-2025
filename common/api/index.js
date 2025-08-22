import * as UserApi from './user.js'

/** post请求，获取菜单 */
// export const postMenu = (params, config = {}) => uni.$uv.http.post('/ebapi/public_api/index', params, config)

/**
 * 需要注意的是，get请求与post请求略有不同，get请求所有参数都在方法的第二个参数中，而post请求的第二个参数为请求参数params，而第三个参数才为配置项。.
 * */
// export const getMenu = (data) => uni.$uv.http.get('/ebapi/public_api/index', data)

export {
	UserApi
}