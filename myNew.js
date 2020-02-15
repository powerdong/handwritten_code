/**
 * 模拟 new
 * @param {*} context 上下文
 * @param  {...any} args 参数
 */
const myNew = function(context, ...args) {
  // 创建一个新对象
  // 把 this 绑定到空对象上
  const obj = {}
  // TODO: 使空对象的 __proto__ 指向构造函数的原型 prototype
  Object.setPrototypeOf(obj,context.prototype)
  // 执行构造函数，为空对象添加属性
  let result = context.apply(obj,args)
  // !: 判断构造函数的返回值是否为对象，如果是对象，就使用构造函数的返回值，否则返回创建的对象
  return result instanceof Object ? result : obj
}

export default myNew