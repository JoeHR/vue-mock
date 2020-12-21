const checkArray = (key) => {
  const arr = [1, 2, 3, 4, 5]
  return arr.includes(key)
}

export default {
  inserted (el, { value }) {
    if (value) {
      const hasPermission = checkArray(value)
      if (!hasPermission) {
        // 没有权限 移除 dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}
