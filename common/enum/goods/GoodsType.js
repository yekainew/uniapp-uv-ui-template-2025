import {
	createEnum
} from "../enum";

/**
 * 枚举类：商品类型
 * GoodsTypeEnum
 */
export default createEnum([{
		key: 'PHYSICAL',
		name: '实物商品',
		value: 10
	},
	{
		key: 'VIRTUAL',
		name: '虚拟商品',
		value: 20
	}
])