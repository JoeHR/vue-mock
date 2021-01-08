/**
 * 函数防抖
 * @param {*} fn
 * @param {*} delay
 */
export function Debounce (fn, delay = 500) {
  let timer
  return function () {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}

// 节流
export function throttle (fn, delay) {
  let timer
  let prevTime
  return function (...args) {
    const currTime = Date.now()
    const context = this
    if (!prevTime) prevTime = currTime
    clearTimeout(timer)

    if (currTime - prevTime > delay) {
      prevTime = currTime
      fn.apply(context, args)
      clearTimeout(timer)
      return
    }

    timer = setTimeout(function () {
      prevTime = Date.now()
      timer = null
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 从缓存中提取token
 */
export function getToken () {
  return sessionStorage.getItem('token')
}
