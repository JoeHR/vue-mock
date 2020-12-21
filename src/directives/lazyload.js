/**
 * 图片懒加载
 */
import defaultSrc from '@/assets/logo.png'
import { throttle } from '@/utils'

// 加载真实 源
const load = (el) => {
  const windowHeight = document.documentElement.clientHeight
  const elTop = el.getBoundingClientRect().top
  const elBtm = el.getBoundingClientRect().bottom
  const realSrc = el.dataset.src
  if (elTop - windowHeight < 0 && elBtm > 0) {
    if (realSrc) {
      el.src = realSrc
      el.removeAttribute('data-src')
    }
  }
}

// 利用IntersectionObserver监听el
const observe = (el) => {
  const io = new IntersectionObserver((entries) => {
    const realSrc = el.dataset.src
    if (entries[0].isIntersecting) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  })
  io.observe(el)
}

const listenerScroll = (el) => {
  const handler = throttle(load, 300)
  load(el)
  window.addEventListener('scroll', () => {
    handler(el)
  })
}

export default {
  bind (el, { value }) {
    el.setAttribute('data-src', value)
    el.setAttribute('src', defaultSrc)
  },
  inserted (el) {
    if (IntersectionObserver) {
      observe(el)
    } else {
      listenerScroll(el)
    }
  }
}
