/**
 * 模拟apply
 * @param {*} context 上下文
 */
const myApply = function(context) {
  context = (context ?? window) || new Object(context)
  const key = Symbol()
  // 第二个参数可以不传，但类型必须为数组
  const args = arguments[1]
  context[key] = this
  const result = args ? context[key](...args) : context[key]()
  delete context[key]
  return result
}

export default myApply