<script>
export default {
	onLaunch: function () {
		console.log('App Launch');

		// #ifdef MP
		const startParamObj = wx.getEnterOptionsSync();
		if (wx.canIUse('getUpdateManager') && startParamObj.scene !== 1154) {
			const updateManager = wx.getUpdateManager();

			updateManager.onCheckForUpdate((res) => {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					// 新版本下载成功
					updateManager.onUpdateReady(() => {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经下载好，是否重启当前应用？',
							success(res) {
								if (res.confirm) {
									updateManager.applyUpdate();
								}
							}
						});
					});

					// 新版本下载失败
					updateManager.onUpdateFailed(() => {
						wx.showModal({
							title: '发现新版本',
							content: '请删除当前小程序，重启搜索打开...'
						});
					});
				}
			});
		}
		// #endif
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import '@/uni_modules/uv-ui-tools/index.scss';
/*每个页面公共css */
</style>
