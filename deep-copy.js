function deepClone(value, hash = new WeakMap()) {
  // 基本类型和函数直接返回
  if (Object(value) !== value || typeof value === 'function') {
      return value;
  }

  // 处理 Date
  if (value instanceof Date) {
      return new Date(value);
  }

  // 处理 RegExp
  if (value instanceof RegExp) {
      return new RegExp(value);
  }

  // 处理 Map
  if (value instanceof Map) {
      const result = new Map();
      value.forEach((val, key) => {
          result.set(deepClone(key, hash), deepClone(val, hash));
      });
      return result;
  }

  // 处理 Set
  if (value instanceof Set) {
      const result = new Set();
      value.forEach((val) => {
          result.add(deepClone(val, hash));
      });
      return result;
  }

  // 处理循环引用
  if (hash.has(value)) {
      return hash.get(value);
  }

  // 处理对象和数组
  const result = Array.isArray(value) ? [] : {};
  hash.set(value, result);

  Reflect.ownKeys(value).forEach(key => {
      result[key] = deepClone(value[key], hash);
  });

  return result;
}


const obj = {
  number: 1,
  string: 'hello',
  bool: true,
  nullValue: null,
  undefinedValue: undefined,
  symbol: Symbol('symbol'),
  bigint: BigInt(10),
  date: new Date(),
  regex: /abc/g,
  array: [1, 2, 3],
  nestedObj: {
      a: 1,
      b: 2
  },
  func: function () {
      console.log('function');
  },
  map: new Map([['key1', 'value1'], ['key2', 'value2']]),
  set: new Set([1, 2, 3]),
  circular: null
};

obj.circular = obj; // 设置循环引用

const clonedObj = deepClone(obj);
console.log(clonedObj);
console.log(clonedObj.circular === clonedObj); // true, 确保循环引用的正确性
console.log(clonedObj.func === obj.func); // true, 函数直接返回同一引用
