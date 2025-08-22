import {
	defineStore
} from 'pinia';
import {
	ref,
	computed
} from 'vue';
import {
	LOGIN_STATUS,
	USER_INFO,
	CACHE_LATITUDE,
	CACHE_LONGITUDE,
} from '@/common/config/cache.js'
import {
	UserApi
} from '@/common/api'

export const useUserStore = defineStore('user', () => {
	const token = ref(uni.getStorageSync(LOGIN_STATUS) || false)
	const userInfo = ref(uni.getStorageSync(USER_INFO) || null)

	/** 是否登录 */
	const isLogin = computed(() => !!token.value)

	/** 退出登录 */
	const logOut = (state, payload) => {
		token.value = false
		userInfo.value = null
		// uni.removeStorageSync(LOGIN_STATUS)
		// uni.removeStorageSync(USER_INFO)
		// uni.removeStorageSync(CACHE_LATITUDE)
		// uni.removeStorageSync(CACHE_LONGITUDE)
		uni.clearStorageSync()
	}

	/**
	 * 登录
	 * @param {object} param 请求参数
	 */
	const handleLogin = async (api, param) => {
		const res = await UserApi.login(param, {
			custom: {
				auth: false,
				toast: true
			}
		})
		token.value = res.result.token
		uni.setStorageSync(LOGIN_STATUS, res.result.token)
		userInfo.value = res.result.userInfo
		uni.setStorageSync(USER_INFO, res.result.userInfo)
		return res
	}

	/**
	 * 获取用户信息
	 * @return {Promise<object>} 用户信息
	 */
	const getUserInfo = async () => {
		const res = await UserApi.getUserInfo()
		userInfo.value = res.result.userInfo
		uni.setStorageSync(USER_INFO, res.result.userInfo)
		return res
	}

	return {
		// states
		token,
		userInfo,

		// getters
		isLogin,

		// actions
		handleLogin,
		getUserInfo,
		logOut,
	}
});