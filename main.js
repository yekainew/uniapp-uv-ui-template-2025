import App from './App'
import uvUI from '@/uni_modules/uv-ui-tools'
import {
	Request
} from '@/utils/request/index.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uvUI);
try {
	function isPromise(obj) {
		return (!!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function");
	}
	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}
const app = new Vue({
	...App
})
app.$mount()
// 引入请求封装
Request(app)
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia';
export function createApp() {
	/** pinia 仅支持 Vue3 */
	const app = createSSRApp(App)
	app.use(Pinia.createPinia());
	app.use(uvUI);
	// 引入请求封装
	Request(app)
	return {
		app,
		Pinia, // 此处必须将 Pinia 返回
	}
}
// #endif