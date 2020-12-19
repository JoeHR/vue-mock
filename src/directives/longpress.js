/**
 * 长按事件
 */

export default {
  bind (el, { value }) {
    if (!value || typeof value !== 'function') {
      throw new Error('callback must be a function')
    }

    let pressTimer = null

    // 创建定时器（2秒后执行函数）
    const start = e => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          el.handler(e)
        }, 2000)
      }
    }

    // 取消定时器
    const cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    // 运行函数
    el.handler = (e) => {
      value(e)
    }

    // 添加事件
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)

    // 取消定时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },

  // 当传进来的值更新的时候触发
  componentUpdated (el, { value }) {
    el.$value = value
  },

  // 指令与元素解绑的时候，移除事件监听
  unbind (el) {
    el.removeEventListener('click', el.handler)
  }
}
