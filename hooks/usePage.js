import {
	reactive,
	toRefs
} from 'vue';

export default function usePage(getData) {
	const state = reactive({
		status: 'more', // 可选值 more loading noMore 和 contentText 的三个提示语相对应
		page: 1,
		total: 0,
		list: [],
		contentText: {
			contentdown: '查看更多',
			contentrefresh: '加载中',
			contentnomore: '没有更多了'
		},
		isLoadMore: false
	});

	/**
	 * 加载更多
	 * @param {Function} func 加载函数
	 */
	async function handleLoadMore(func) {
		if (state.list.length >= state.total) return
		state.status = 'loading';
		try {
			const res = await func();
		} catch (error) {
			console.error('Error during data loading:', error);
		}
	}

	/**
	 * 设置列表
	 * @param {Object} res 请求结果
	 * @param {Array} [res.records] 请求结果列表
	 * @param {Number} [res.total] 请求结果总计
	 */
	function setList(res) {
		if (state.page === 1) {
			state.list = res?.records || [];
		} else {
			state.list = state.list.concat(res?.records || []);
		}
		state.total = res?.total || 0;
		setStatus()
	}

	function setStatus() {
		if (state.list.length === state.total) {
			state.contentText.contentdown = '没有更多了';
			state.status = 'noMore';
		} else {
			state.contentText.contentdown = '查看更多';
			state.status = 'more';
			state.isLoadMore = false;
		}
	}

	/**
	 * 重置数据
	 */
	function initList() {
		state = {
			status: 'more', // 可选值 more loading noMore 和 contentText 的三个提示语相对应
			page: 1,
			total: 0,
			list: [],
			contentText: {
				contentdown: '查看更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多了'
			},
			isLoadMore: false
		}
	}

	return {
		...toRefs(state),
		initList,
		setList,
		handleLoadMore
	};
}