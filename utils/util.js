/**
 * 回调直接输出
 * @param {Function} fn uniapp的api组件
 * @param {Object} options 组件配置项
 */
export const toPromise = (fn, options = {}) => new Promise((resolve, reject) => {
	fn({
		...options,
		success: (res) => resolve(res),
		fail: (err) => reject(err),
		complete: (err) => reject(err),
		cancel: (err) => reject(err),
	})
})

/**
 * 获取权限
 * @param {String} scope 需要获取权限的 scope
 * @param {String} modalContent 二次确认模态框文本
 * @throws 提示文本
 * @return {Promise} uni.authorize 成功回调
 * @example getAuth('location', '授权提示')
 */
export const getAuth = (scope, modalContent = '是否前往授权') =>
	toPromise(uni.authorize, {
		scope
	})
	.then(res => res)
	.catch(async (err) => {
		const {
			confirm
		} = await toPromise(uni.showModal, {
			content: modalContent,
			showCancel: false,
		})
		if (confirm !== true) throw new Error('授权失败')
		const {
			authSetting
		} = await toPromise(uni.openSetting)
		if (!authSetting[scope]) throw new Error('授权失败')
		return authSetting
	})

/**
 * 获取地址位置
 * @param {Object} config uni.getLocation地址配置项
 * @returns {Object} { longitude, latitude }
 */
export const getLocation = (config = {}) => new Promise(async (resolve, reject) => {
	// TODO app会直接错误,原因未探究
	try {
		await getAuth('scope.userLocation', '是否前往授权获取地址')
		const {
			longitude,
			latitude
		} = await toPromise(uni.getLocation, {
			type: 'wgs84',
			...config
		})
		return resolve({
			longitude,
			latitude
		})
	} catch (err) {
		console.log(err)
		uni.$uv.toast('授权失败')
		return reject('授权失败')
	}
})