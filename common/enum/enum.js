/**
 * Enum 枚举类
 * @example
 * - Enum.createEnum([{ key: "IMAGE", name: "图片", value: 10 }])
 * - enumInstance.getNameByKey('IMAGE')    => "图片"
 * - enumInstance.getValueByKey('IMAGE')   => 10
 * - enumInstance.getNameByValue(10)       => "图片"
 * - enumInstance.getData()                => [{ key: "IMAGE", name: "图片", value: 10 }]
 */

// 使用 WeakMap 存储私有数据
const keyMapStore = new WeakMap();
const valueMapStore = new WeakMap();

class Enum {
	constructor(items) {
		if (!Array.isArray(items)) {
			throw new TypeError('Parameter must be an array.');
		}

		// 私有 Map 用于存储 key-value 映射
		const keyMap = new Map();
		const valueMap = new Map();

		// 构建枚举数据，初始化 Map
		items.forEach(item => {
			if (!item.key || item.value === undefined || !item.name) {
				throw new Error('Each item must contain "key", "value", and "name" properties.');
			}

			// 动态添加 key 和 value 属性
			this[item.key] = item;
			if (item.key !== item.value) {
				this[item.value] = item;
			}

			// 填充 Map，用于后续查找
			keyMap.set(item.key, item);
			valueMap.set(item.value, item);
		});

		// 使用 WeakMap 存储私有数据
		keyMapStore.set(this, keyMap);
		valueMapStore.set(this, valueMap);

		// 冻结 data 属性，防止被修改
		this.data = Object.freeze(items);
	}

	/**
	 * 静态方法：创建 Enum 实例
	 * @param {Array} items - 包含 { key, name, value } 的枚举项数组
	 * @returns {Enum} - Enum 实例
	 */
	static createEnum(items) {
		return new Enum(items);
	}

	/**
	 * 根据 key 获取 name
	 * @param {*} key
	 * @returns {string}
	 */
	getNameByKey(key) {
		return this._getBy(keyMapStore.get(this), key, 'name');
	}

	/**
	 * 根据 value 获取 name
	 * @param {*} value
	 * @returns {string}
	 */
	getNameByValue(value) {
		return this._getBy(valueMapStore.get(this), value, 'name');
	}

	/**
	 * 根据 key 获取 value
	 * @param {*} key
	 * @returns {*}
	 */
	getValueByKey(key) {
		return this._getBy(keyMapStore.get(this), key, 'value');
	}

	/**
	 * 根据 key 获取对象
	 * @param {*} key
	 * @returns {Object|null}
	 */
	keyOf(key) {
		return keyMapStore.get(this).get(key) || null;
	}

	/**
	 * 根据 value 获取对象
	 * @param {*} value
	 * @returns {Object|null}
	 */
	valueOf(value) {
		return valueMapStore.get(this).get(value) || null;
	}

	/**
	 * 获取所有枚举数据
	 * @returns {Array} 数组 - 返回原始数据数组
	 */
	getData() {
		return this.data;
	}

	/**
	 * 通用查找方法
	 * @param {Map} map - 用于查找的 Map
	 * @param {*} key - 查找的键
	 * @param {string} field - 返回的字段名
	 * @returns {*} - 查找到的字段值
	 */
	_getBy(map, key, field) {
		const item = map.get(key);
		if (!item) {
			throw new Error(`No enum constant with ${field === 'name' ? 'key' : 'value'}: ${key}`);
		}
		return item[field];
	}
}

export const createEnum = Enum.createEnum;