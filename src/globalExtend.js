import '@/directives'
import { Debounce } from '@/utils'
import Dialog from '@/components/common/Dialog'
import Vue from 'vue'

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

Vue.prototype.$showDialog = Dialog.show
Vue.prototype.$alertDialog = Dialog.showNoModal
Vue.prototype.$showNotify = Dialog.showNotify
