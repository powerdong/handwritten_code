/**
 * 深度克隆（简单版）
 * !: 缺点：无法拷贝函数、Map、Set、正则等其他类型
 * @param {*} target 目标
 * @param {*} origin 原始
 */
const deepClone = function (target, origin) {
  var origin = origin || {}
  for (const prop in target) {
    if (target.hasOwnProperty(prop)) {
      if (target[prop] !== 'null' && typeof target[prop] === 'object') {
        if (Object.prototype.toString.call(target[prop]) === '[object Array]') {
          origin[prop] = []
        } else {
          origin[prop] = {}
        }
        // TODO: 对引用类型递归拷贝到属性为原始类型
        deepClone(target[prop], origin[prop])
      } else {
        origin[prop] == target[prop]
      }
    }
  }
  return origin
}


// 由于要面对不同的对象(正则，数组，Date等)要采用不同的处理方式，需要实现一个对象判断类型的函数

const isType = (obj, type) => {
  if (typeof obj !== 'object') return false
  const typeString = Object.prototype.toString.call(obj)
  let flag
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]'
      break;
    case 'Date':
      flag = typeString === '[object Date]'
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]'
    default:
      flag = false
      break;
  }
}

// 我们需要通过正则的扩展了解到 flags 属性

/**
 * 提取 flags 的函数
 * @param {RegExp} re 
 */
const getRegExp = re => {
  let flags = ''
  if (re.global) flags += 'g'
  if (re.ignoreCase) flags += 'i'
  if (re.multiline) flags += 'm'
  return flags
}

/**
 * deepClone 深度克隆
 * @param {[type]} parent 需要克隆的对象
 * @return {[type]} 深克隆后的对象
 */
const deepClonePlus = parent => {
  // 维护两个存储循环引用的数组
  const parents = []
  const children = []

  const _clone = parent => {
    if(parent === null) return null
    if(typeof parent !== 'object') return parent

    let child, proto;

    if(isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = []
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent))
      if(parent.lastIndex) {
        child.lastIndex = parent.lastIndex
      }
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime())
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent)
      // 利用Object.create切断原型链
      child = Object.create(proto)
    }

    // 处理循环引用
    const index = parents.indexOf(parent)

    if(index !== -1) {
      // 如果父数组存在本对象，说明之前已经被引用过，直接返回此对象
      return children[index]
    }
    parents.push(parent)
    children.push(child)

    for (const i in parent) {
      child[i] = _clone(parent[i])
    }

    return child
  }
  return _clone(parent)
}

export {
  deepClone,
  deepClonePlus
}

// ===================================
// test
class Person {
  constructor(pname) {
    this.name = pname
  }
}

const Lambda = new Person('Lambda')

function say() {
  console.log('this is say fn');
}

const oldObj = {
  a : say,
  b : Lambda,
  c : new RegExp('abc', 'i')
}

oldObj.d = oldObj

const newObj = deepClonePlus(oldObj)
