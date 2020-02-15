/**
 * 函数节流（使用定时器）
 * 指连续触发事件，但是在 n 秒中只执行一次函数，适合应用于动画相关的场景
 * @param {*} fn 事件函数
 * @param {*} wait 循环事件
 */
const throttleSetTimeout = (fn, wait = 300) => {
  let timerId, result
  return function(...args) {
    if(!timerId) {
      timerId = setTimeout(() => {
        timerId = null
        return result = fn.apply(this, ...args)
      }, wait);
    }
  }
}

/**
 * 函数节流（时间戳）
 * @param {*} fn 
 * @param {*} wait 
 */
const throttleNewDate = (fn, wait = 300) =>{
  let prev = 0, result
  return function(...args) {
    let now = +new Date()
    if(now - prev > wait) {
      prev = now
      return result = fn.apply(this, ...args)
    }
  }
}

/**
 * 函数节流最终版
 * @param {*} fn 事件函数
 * @param {*} wait 等待时间
 * !: leading,trailing 不能同时设置
 * @param {Object} param2 配置属性
 */
const throttle = (fn, wait = 300, {
  // 参数解构赋值
  leading = true, // 是否第一次执行
  trailing = true // 是否停止触发回调
} = {}) => {
  let prev = 0, timerId
  const later = function(...args) {
    timerId && clearTimeout(timerId)
    timerId = setTimeout(() => {
      timerId = null
      fn.apply(this, ...args)
    }, wait);
  }
  return function(...args) {
    let now = +new Date()
    if(!leading) return later(...args)
    if(now - prev > wait) {
      fn.apply(this, args)
      prev = now
    } else if(trailing) {
      later(...args)
    }
  }
}

export {
  throttle,
  throttleNewDate,
  throttleSetTimeout
}