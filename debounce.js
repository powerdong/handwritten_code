/**
 * 函数防抖
 * 函数防抖是在事件被触发 n 秒后再次执行，如果在 n 秒内又被触发，则重新计时。
 * 函数防抖多用于 input 输入框
 * 
 * 这里使用箭头函数 箭头函数的 this 继承自父级上下文，这里指向触发事件的目标元素
 * @param {Function} fn 事件函数
 * @param {Number} wait 等待时间
 * @param {Boolean} leading 是否可以立即执行回调函数，不必要等到事件停止触发后才开始执行
 */
const debounce =  (fn, wait = 300, leading = true) => {
  let timerId, result
  return function (...args) {
    timerId && clearTimeout(timerId)
    if(leading) {
      if(!timerId) result = fn.apply(this, ...args)
      timerId = setTimeout(() => {
        timerId = null
      }, wait);
    } else {
      timerId = setTimeout(() => {
        result = fn.apply(this, ...args)
      }, wait);
    }
    return result
  }
}

export default debounce