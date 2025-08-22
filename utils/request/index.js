import {
	useUserStore
} from "@/stores/user";

export const Request = () => {
	const {
		token
	} = useUserStore()

	// 初始化请求配置
	uni.$uv.http.setConfig((defaultConfig) => {
		/* defaultConfig 为默认全局配置*/
		return Object.assign(defaultConfig, {
			/* 根域名 */
			baseURL: import.meta.env.VITE_API_BASE,
			/* 自定义参数 */
			custom: {
				auth: false,
				catch: true
			}
		});
	});

	// 请求拦截
	uni.$uv.http.interceptors.request.use(
		(config) => {
			// 可使用async await 做异步操作
			// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
			config.data = config.data || {};
			// 根据custom参数中配置的是否需要token，添加对应的请求头
			if (config?.custom?.auth) {
				// pinia 中的 token
				config.header['token'] = token;
			}
			return config;
		},
		(config) => {
			// 可使用async await 做异步操作
			return Promise.reject(config);
		}
	);

	// 响应拦截
	uni.$uv.http.interceptors.response.use(
		(response) => {
			/* 对响应成功做点什么 可使用async await 做异步操作*/
			const data = response.data;
			// 自定义参数
			const custom = response.config?.custom
			if (
				(data.code == 401 || data.status == 41004) &&
				!getApp().globalData.showLoginModal
			) {
				getApp().globalData.showLoginModal = true
				uni.showModal({
					title: '提示',
					content: '未登录或登录失效，是否去重新登录？',
					success: (modal) => {
						if (modal.confirm) {
							getApp().globalData.showLoginModal = false
							uni.$uv.route('/pages/mine/login') // 登录页 
						} else if (modal.cancel) {
							getApp().globalData.showLoginModal = false
						}
					}
				});
				return new Promise(() => {})
			}
			if (data.status !== 1) { // 服务端返回的状态码不等于1，则reject()
				// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
				if (custom.toast !== false) {
					uni.$uv.toast(data.msg)
				}
				// 如果需要catch返回，则进行reject
				if (custom?.catch) {
					return Promise.reject(data)
				} else {
					// 否则返回一个pending中的promise
					return new Promise(() => {})
				}
			}
			return data.data || data || {};
		},
		(response) => {
			// 对响应错误做点什么 （statusCode !== 200）
			return Promise.reject(response);
		}
	);
};