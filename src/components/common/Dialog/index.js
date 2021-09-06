// import { defineAsyncComponent, createVNode, render } from 'vue'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import { setTimeout } from 'core-js'

let id = 0
const notifyInstances = []

const notifyInstancesSpliceTrack = (height = 0, index = 0) => {
  notifyInstances.forEach((ins, i) => {
    if (i >= index) {
      ins.el.style.top = ins.el.getBoundingClientRect().top - height - 16 + 'px'
    }
  })
}
class Dialog {
  static show (title, component, options = {}, params = {}) {
    return new Promise((resolve, reject) => {
      // 创建弹窗容器
      const layout = document.createElement('div')
      const layoutWrap = document.createElement('div')
      const layoutHeader = document.createElement('div')
      const layoutBody = document.createElement('div')
      const layoutHeaderTitle = document.createElement('div')
      const layoutHeaderClose = document.createElement('i')
      layout.className = `rh-dialog rh-dialog-${id++}`
      // 兼容ie style 在 ie 浏览器中为只读属性,不可编辑
      layout.style.position = 'fixed'
      layout.style.left = '0'
      layout.style.top = '0'
      layout.style.right = '0'
      layout.style.bottom = '0'
      layout.style.zIndex = 1000 + id
      layout.style.background = 'rgba(0,0,0,.2)'
      layout.style.display = 'flex'
      layout.style.justifyContent = 'center'
      if (options.center) {
        layout.style.alignItems = 'center'
      }
      // layout.style = `position:fixed;left:0;top:0;right:0;bottom:0;z-index:${1000 +
      //   id};background:rgba(0,0,0,.2);display:flex;justify-content:center;${options.center ? 'align-items:center;' : ''}`
      layoutWrap.className = 'rh-dialog-wrap'
      layoutWrap.style.width = `${options.width || 'auto'}`
      layoutWrap.style.height = `${options.height || 'auto'}`
      layoutWrap.style.position = 'absolute'
      if (!options.center) {
        layoutWrap.style.top = '15vh'
      }
      // layoutWrap.style = `width:${options.width ||
      //   'auto'};height:${options.height || 'auto'};position:absolute;${options.center ? '' : 'top:15vh;'}`
      layoutHeader.className = 'rh-dialog-header'
      layoutHeader.style.cursor = 'move'
      layoutHeaderTitle.className = 'rh-dialog-header-title'
      layoutHeaderTitle.innerHTML = title
      layoutHeaderClose.className = 'iconfont iconguanbi'
      layoutHeaderClose.style.cursor = 'pointer'
      if (options.noClose) {
        layoutHeaderClose.style.display = 'none'
      } else {
        layoutHeaderClose.style.display = 'block'
      }
      // layoutHeaderClose.style = `display:${options.noClose ? 'none' : 'block'}`
      layoutBody.className = 'rh-dialog-body'
      layoutHeader.appendChild(layoutHeaderTitle)
      layoutHeader.appendChild(layoutHeaderClose)

      // 给 弹窗 绑定 拖拽事件
      const style =
        layoutWrap.currentStyle || window.getComputedStyle(layoutWrap, null)
      layoutHeader.onmousedown = e => {
        const disx = e.clientX - layoutWrap.offsetLeft
        const disy = e.pageY - layoutWrap.offsetTop

        document.onmousemove = e => {
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

          layoutWrap.style.left = x + 'px'
          layoutWrap.style.top = y + 'px'
        }

        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }

      const observer = {
        cancel: function (isSuccess = false) {
          this.close()
          if (isSuccess) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        close: () => {}
      }

      const Content = Vue.extend(component)
      const vueObj = new Content({
        router,
        store,
        propsData: params
      })

      vueObj.observer = observer
      vueObj.$mount()
      layoutBody.appendChild(vueObj.$el)

      layoutHeaderClose.addEventListener('click', () => {
        vueObj.observer.close()
      })
      layoutWrap.appendChild(layoutHeader)
      layoutWrap.appendChild(layoutBody)
      layout.appendChild(layoutWrap)
      const close = () => {
        // vueObj.$destroy()
        // render(null, layoutBody)
        vueObj.$destroy()
        layout.classList.add('rh-dialog-leave')
        const expolyerPre = [
          'animationend',
          'webkitAnimationEnd',
          'mozAnimationEnd',
          'MSAnimationEnd',
          'oAnimationEnd'
        ]
        expolyerPre.forEach(v => {
          layoutWrap.addEventListener(
            v,
            () => {
              document.body.removeChild(layout)
              layout && layout.remove()
            },
            false
          )
        })
      }
      vueObj.observer.close = close
      document.body.appendChild(layout)
    })
  }

  static showNoModal (title, component, options = {}, params = {}) {
    return new Promise((resolve, reject) => {
      // 创建弹窗容器
      // const layout = document.createElement('div')
      const layoutWrap = document.createElement('div')
      const layoutHeader = document.createElement('div')
      const layoutBody = document.createElement('div')
      const layoutHeaderTitle = document.createElement('div')
      const layoutHeaderClose = document.createElement('i')
      // layout.className = `rh-dialog rh-dialog-${id++}`
      // 兼容ie style 在 ie 浏览器中为只读属性,不可编辑
      layoutWrap.style.position = 'fixed'
      layoutWrap.style.width = `${options.width || '300px'}`
      layoutWrap.style.height = `${options.height || '300px'}`
      layoutWrap.style.left = document.body.clientWidth * 0.5 - 0.5 * parseInt(options.width || 300) + 'px'
      layoutWrap.style.top = document.body.clientHeight * 0.5 - 0.5 * parseInt(options.height || 300) + 'px'
      layoutWrap.style.zIndex = 1000 + id
      layoutWrap.className = `rh-dialog-wrap  rh-dialog-nomodal rh-dialog-nomodal-${id++}`
      layoutHeader.className = 'rh-dialog-header'
      layoutHeader.style.cursor = 'move'
      layoutHeaderTitle.className = 'rh-dialog-header-title'
      layoutHeaderTitle.innerHTML = title
      layoutHeaderClose.className = 'iconfont iconguanbi'
      layoutHeaderClose.style.cursor = 'pointer'
      if (options.noClose) {
        layoutHeaderClose.style.display = 'none'
      } else {
        layoutHeaderClose.style.display = 'block'
      }
      // layoutHeaderClose.style = `display:${options.noClose ? 'none' : 'block'}`
      layoutBody.className = 'rh-dialog-body'
      layoutHeader.appendChild(layoutHeaderTitle)
      layoutHeader.appendChild(layoutHeaderClose)

      // 给 弹窗 绑定 拖拽事件
      const style =
        layoutWrap.currentStyle || window.getComputedStyle(layoutWrap, null)
      layoutHeader.onmousedown = e => {
        const disx = e.clientX - layoutWrap.offsetLeft
        const disy = e.pageY - layoutWrap.offsetTop

        document.onmousemove = e => {
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

          layoutWrap.style.left = x + 'px'
          layoutWrap.style.top = y + 'px'
        }

        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }

      const observer = {
        cancel: function (isSuccess = false) {
          this.close()
          if (isSuccess) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        close: () => {}
      }

      const Content = Vue.extend(component)
      const vueObj = new Content({
        router,
        store,
        propsData: params
      })

      vueObj.observer = observer
      vueObj.$mount()
      layoutBody.appendChild(vueObj.$el)
      layoutHeaderClose.addEventListener('click', () => {
        vueObj.observer.close()
      })
      layoutWrap.appendChild(layoutHeader)
      layoutWrap.appendChild(layoutBody)

      const close = () => {
        vueObj.$destroy()
        layoutWrap.classList.add('rh-dialog-leave')
        const expolyerPre = [
          'animationend',
          'webkitAnimationEnd',
          'mozAnimationEnd',
          'MSAnimationEnd',
          'oAnimationEnd'
        ]
        expolyerPre.forEach(v => {
          layoutWrap.addEventListener(
            v,
            () => {
              document.body.removeChild(layoutWrap)
              layoutWrap && layoutWrap.remove()
            },
            false
          )
        })
      }
      vueObj.observer.close = close
      document.body.appendChild(layoutWrap)
    })
  }

  static showNotify (component, params, duration = 5000) {
    const layout = document.createElement('div')
    layout.classList.add('rh-notify')
    layout.classList.add(`rh-notify-${id++}`)
    layout.style.position = 'fixed'
    layout.style.zIndex = 1000
    layout.style.right = '16px'
    layout.id = `notify-${id}`
    let top = 0
    notifyInstances.forEach(ins => {
      top += ins.el.offsetHeight + 16
    })
    top += 16
    layout.style.top = top + 'px'
    const Content = Vue.extend(component)
    const vueObj = new Content({
      router,
      store,
      propsData: params
    })
    const observer = {
      close: () => {
        vueObj.$destroy()
        layout.classList.add('rh-notify-leave')
        const expolyerPre = [
          'animationend',
          'webkitAnimationEnd',
          'mozAnimationEnd',
          'MSAnimationEnd',
          'oAnimationEnd'
        ]
        expolyerPre.forEach(v => {
          layout.addEventListener(
            v,
            () => {
              const height = layout.offsetHeight
              document.body.removeChild(layout)
              layout && layout.remove()
              const index = notifyInstances.findIndex(v => v.id === layout.id)
              notifyInstances.splice(index, 1)
              notifyInstancesSpliceTrack(height, index)
            },
            false
          )
        })
      }
    }
    vueObj.observer = observer
    vueObj.$mount()
    layout.appendChild(vueObj.$el)
    document.body.appendChild(layout)
    if (duration) {
      setTimeout(vueObj.observer.close, duration)
    }
    notifyInstances.push({ id: layout.id, el: layout })
  }
}

export default Dialog
