import { toThousand, getDurationTime } from '@/utils'

/**
 * 贝塞尔速度曲线
 * @param {*} currentTime
 * @param {*} startValue
 * @param {*} changeValue
 * @param {*} duration
 */
const easeInOutQuad = (currentTime, startValue, changeValue, duration) => {
  currentTime /= duration / 2
  if (currentTime < 1) {
    return (changeValue / 2) * currentTime * currentTime + startValue
  }
  currentTime--
  return (
    (-changeValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue
  )
}

/**
 * 数字跳动动画
 * @param {*} el
 * @param {*} dest
 */
const animate = (el, dest) => {
  let myReq = null // 计时器指针
  const startTime = new Date().getTime() // 动画开始执行时间
  const begin = el.oldValue || 0 // 动画起始状态
  const change = dest - begin // 动画 变量区间
  const duration = 3000 // 动画持续时间
  // 动画分解步骤
  function step () {
    const newTime = new Date().getTime() // 该分解步骤每一次执行时的当前时间
    const timestamp = newTime - startTime // 逝去时间
    const showValue = parseInt(
      easeInOutQuad(timestamp, begin, change, duration)
    ) // 根据速度曲线计算展示值
    if (el.dataset.time) {
      el.innerText = getDurationTime(showValue)
    } else if (el.dataset.thousand) {
      el.innerText = toThousand(showValue) // 赋值
    } else {
      el.innerText = showValue
    }
    el.oldValue = showValue // 缓存值
    if (duration <= timestamp) {
      // 动画临界条件
      if (el.dataset.time) {
        el.innerText = getDurationTime(dest)
      } else if (el.dataset.thousand) {
        el.innerText = toThousand(dest)
      } else {
        el.innerText = dest
      }
      el.oldValue = dest
      window.cancelAnimationFrame(myReq)
    } else {
      myReq = window.requestAnimationFrame(step)
    }
  }
  step()
}

export default {
  inserted (el, bind) {
    const { value } = bind
    const dest = parseInt(value)
    el.oldValue = el.oldValue || 0
    animate(el, dest)
  },
  componentUpdated (el, bind) {
    const { value } = bind
    const dest = parseInt(value)
    animate(el, dest)
  }
}
