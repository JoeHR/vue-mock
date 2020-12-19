/**
 * 一键复制
 */

export default {
  bind (el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        // throw new Error('无复制内容')
        console.log('🚀👻👻👻 ~ file: copy.js ~ line 8 ~ bind ~ 无复制内容', '无复制内容')
        return
      }

      const textarea = document.createElement('textarea')

      textarea.readOnly = true
      textarea.style.position = 'absolute'
      textarea.style.zIndex = -999
      textarea.style.left = 0
      textarea.style.top = 0
      textarea.value = el.$value

      document.body.appendChild(textarea)

      textarea.select()
      const result = document.execCommand('copy')
      if (result) {
        console.log('🚀👻👻👻 ~ file: copy.js ~ line 25 ~ bind ~ result', result)
        console.log('复制成功') // 可根据项目UI仔细设计
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated (el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind (el) {
    el.removeEventListener('click', el.handler)
  }
}
