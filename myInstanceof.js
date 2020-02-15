/**
 * 模拟 instanceof
 * @param {*} left 变量 
 * @param {*} right 类型
 */
const myInstanceof = function(left, right) {
  var leftValue = left.__proto__
  var rightValue = right.prototype
  while(true) {
    // TODO: 遍历左边变量的原型链，直到找到右边变量的 prototype，如果没有找打，返回 false
    if(leftValue === null) return false
    if(leftValue === rightValue) return true
    leftValue = leftValue.__proto__
  }
}

export default myInstanceof