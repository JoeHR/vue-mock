/**
 * 拖拽
 */
export default {
  inserted (el) {
    el.style.cursor = 'move'
    el.style.position = el.style.position || 'absolute'
    // 获取 dragDom 的原有属性
    const style = el.currentStyle || window.getComputedStyle(el, null)

    el.onmousedown = (e) => {
      const disx = e.clientX - el.offsetLeft
      const disy = e.clientY - el.offsetTop

      document.onmousemove = (e) => {
        let x = e.pageX - disx
        let y = e.pageY - disy
        const { clientWidth, clientHeight } = document.body
        const maxX = clientWidth - parseInt(style.width)
        const maxY = clientHeight - parseInt(style.height)

        if (x < 0) {
          x = 0
        } else if (x > maxX) {
          x = maxX
        }

        if (y < 0) {
          y = 0
        } else if (y > maxY) {
          y = maxY
        }

        el.style.left = x + 'px'
        console.log('🚀👻👻👻 ~ file: drag.js ~ line 32 ~ inserted ~ x', x)
        el.style.top = y + 'px'
        console.log('🚀👻👻👻 ~ file: drag.js ~ line 34 ~ inserted ~ y', y)
      }

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  }
}
