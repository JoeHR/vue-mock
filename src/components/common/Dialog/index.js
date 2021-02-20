import Vue from 'vue'
import router from '@/router'
// import store from '@/store'

let id = 0

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
      layout.style = `position:fixed;left:0;top:0;right:0;bottom:0;z-index:${1000 +
        id};background:rgba(0,0,0,.2);display:flex;justify-content:center;align-items:center;`
      layoutWrap.className = 'rh-dialog-wrap'
      layoutWrap.style = `width:${options.width ||
        'auto'};height:${options.height || 'auto'};position:absolute;`
      layoutHeader.className = 'rh-dialog-header'
      layoutHeader.style.cursor = 'move'
      layoutHeaderTitle.className = 'rh-dialog-header-title'
      layoutHeaderTitle.innerHTML = title
      layoutHeaderClose.className = 'fziconfont fziconguanbi'
      layoutHeaderClose.innerHTML = 'x'
      layoutBody.className = 'rh-dialog-body'
      layoutHeader.appendChild(layoutHeaderTitle)
      layoutHeader.appendChild(layoutHeaderClose)

      // 给 弹窗 绑定 拖拽事件
      const style = layoutWrap.currentStyle || window.getComputedStyle(layoutWrap, null)
      layoutHeader.onmousedown = (e) => {
        const disx = e.clientX - layoutWrap.offsetLeft
        const disy = e.pageY - layoutWrap.offsetTop

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
        close: () => { }
      }

      const Content = Vue.extend(component)
      const vueObj = new Content({
        router: router,
        // store: store,
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
            },
            false
          )
        })
      }
      vueObj.observer.close = close
      document.body.appendChild(layout)
    })
  }
}

Vue.prototype.$dialog = Dialog

export default Dialog
