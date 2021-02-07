
const setScrollAnimate = (el) => {
  // 获取 父容器 的高度
  const wrapEl = el.parentElement
  const wrapHeight = wrapEl.getBoundingClientRect().height
  // 获取 容器自身的高度 和 滚动轮播元素的个数
  const elHeight = el.getBoundingClientRect().height
  const { childElementCount } = el
  // 获取 每隔滚动元素的 高度（即每次滚动高度）
  if (!el.children || !el.children[0]) return
  const childHeight = el.children[0].getBoundingClientRect().height
  // 判断是否存在 对应 的 keyframes style标签，若存在就先删除
  const exitKeyFramesTag = el.keyframesTag
  if (exitKeyFramesTag) {
    const elClassName = exitKeyFramesTag.replace(/-style/g, '')
    document.querySelector('head').removeChild(document.querySelector(`.${exitKeyFramesTag}`))
    el.className = el.className.replace(new RegExp(elClassName, 'g'), '')
  }
  // 只有当 父容器高度 小于 容器高度时 才会需要滚动轮播
  if (wrapHeight < elHeight) {
    // 创建 style 标签
    const keyframesName = `rh-keyframes-${Date.now()}`
    const styleTag = document.createElement('style')
    styleTag.className = `${keyframesName}-style`
    styleTag.type = 'text/css'

    // 定义 style 标签内容
    let keyframes = `
    .${keyframesName} {animation: ${keyframesName} ${3 * (childElementCount - 1)}s infinite;}
    .${keyframesName}.hover {animation-play-state:paused;}

    @keyframes ${keyframesName} {`

    // 分解滚动 步骤
    const stepKeyFrames = Array.from({ length: childElementCount - 1 }, (v, i) => i).map(v => {
      const per = Math.ceil((v / (childElementCount - 1)) * 100)
      return `
      ${per > 0 ? per - 1 : per}% {
        transform:translateY(-${childHeight * v}px);
      }
      ${per}% {
        transform: translateY(-${childHeight * v}px);
      }
      ${per + 1}% {
        transform: translateY(-${childHeight * v}px);
      }
      `
    })
    keyframes += stepKeyFrames.join(' ') + ` 99% {
      transform: translateY(-${elHeight - childHeight}px);
    }
    100% {
        transform: translateY(-${elHeight - childHeight}px);
      }
    }`

    // 给 元素 添加 滚动响应的交互，hover 暂停动画，失去焦点 继续动画
    el.onmouseenter = (e) => {
      el.className += ' hover'
    }
    el.onmouseleave = (e) => {
      el.className = el.className.replace(/ hover/g, '')
    }
    styleTag.innerHTML = keyframes
    // 插入 style标签
    document.querySelector('head').appendChild(styleTag)
    el.className += ` ${keyframesName}`

    // 缓存 对应的 style 标签 id或标识
    el.keyframesTag = `${keyframesName}-style`
  }
}

export default {
  inserted (el, bind) {
    setScrollAnimate(el)
  },
  componentUpdated (el) {
    setScrollAnimate(el)
  }
}
