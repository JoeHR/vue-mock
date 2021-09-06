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

/**
 * 时间差转换
 * @param {*} dis 秒
 */
export function getDurationTime (dis) {
  let ss = Math.round(dis % 60)
  ss = ss > 9 ? ss : '0' + ss
  let m = Math.floor((dis / 60) % 60)
  m = m > 9 ? m : '0' + m
  const h = Math.floor((dis / 3600) % 24)
  const d = Math.floor((dis / 3600) / 24)
  if (d) {
    return `${d}天 ${h > 9 ? h : '0' + h}:${m}:${ss}`
  } else if (h) {
    return `${h > 9 ? h : '0' + h}:${m}:${ss}`
  } else {
    return `${m}′${ss}″`
  }
}

/**
 * 千分位 格式化数字
 * @param {*} num
 * @returns
 */
export function toThousand (num = 0) {
  return Number.prototype.toLocaleString.call(num, 'en-GB') || '0'
}
