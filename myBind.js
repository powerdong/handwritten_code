/**
 * 模拟 bind
 * @param {*} context 上下文
 * @param  {...any} args 参数
 */
const myBind = function(context, ...args) {
  const fn = this
  const bindFn = function(...newFnArgs) {
    return fn.call(
      // !: 当返回的绑定函数作为构造函数被 new 调用，绑定的上下文指向实例对象
      this instanceof bindFn ? this : context,
      ...args, ...newFnArgs
    )
  }
  // 设置绑定函数的 prototype 为原函数的 prototype
  bindFn.prototype = Object.create(fn.prototype)
  // 返回一个绑定函数
  return bindFn
}

export default myBind