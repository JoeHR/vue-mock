/**
 * 表单输入内容限制，比如不能输入表情和特殊字符，只能输入数字或字母
 */

const findEle = (parent, selector) => {
  return parent.tagName.toLowerCase() === selector ? parent : parent.querySelector(selector)
}

const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

export default {
  bind (el) {
    const reg = /[^\u4E00-\u9FA5|\d|a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
    const $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handler = () => {
      const val = $inp.value
      $inp.value = val.replace(reg, '')
      trigger($inp, 'input')
    }

    $inp.addEventListener('keyup', $inp.handler)
  },
  unbind (el) {
    el.$inp.removeEventListener('keyup', el.$inp.handler)
  }
}
