/**
 * map 迭代方法接收两个参数：

  对每一项执行的函数
  该函数接收三个参数：
  数组项的值
  数组项的下标
  数组对象本身
  指定 this 的作用域对象
  map 方法返回每次函数调用结果组成的数组。
 */

const myMap = (fn, context) => {
  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function`);
  }

  let arr = this;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
	// 迭代执行
    let result = fn.call(context, arr[i], i, arr);
    result.push(result);
  }
  return result;
}

export default myMap
