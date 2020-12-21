/**
 * 事件防抖
 */
export default {
  inserted (el, { value }) {
    let timer = null
    el.addEventListener('click', (e) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        value(e)
      }, 500)
    })
  }
}
