import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Debounce } from '@/utils'
import '@/assets/styles/index.scss'
import '@/directives'
import '@/components/common/Dialog'

Vue.config.productionTip = false

const on = Vue.prototype.$on

/**
 * click事件防抖
 * @param {*} evt
 * @param {*} fn
 */
Vue.prototype.$on = function (evt, fn) {
  const newFn = evt === 'click' ? Debounce(fn) : fn
  on.call(this, evt, newFn)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
