/**
 * 模拟 Call 函数
 * @param {*} context 上下文 
 * @param  {...any} args 参数
 */
const myCall = function(context, ...args) {
  // 第一个参数为 null 或者 undefined 时，this 指向全局对象 window
  // 值为原始值的指向该原始值的自动包装对象，如 String、Number、Boolean
  // TODO: ES2020 新特性 Null 判断符 ??
  context = (context ?? window) || new Object(context)
  // 为了避免函数名与上下文(context)的属性发生冲突，使用 Symbol 类型作为唯一值
  const key = Symbol()
  context[key] = this
  // 将函数作为传入的上下文(context)属性执行
  const result = context[key](...args)
  // 函数执行完后删除该属性
  delete context[key]
  // 返回执行结果
  return result
}

export default myCall