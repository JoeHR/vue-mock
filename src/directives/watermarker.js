/**
 * 水印
 */

/**
 *
 * @param {*} str
 * @param {*} parentNode
 * @param {*} font
 * @param {*} textColor
 */
function addWaterMarker (str, parentNode, font, textColor) {
  const can = document.createElement('canvas')
  parentNode.appendChild(can)
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  const cans = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = font || '16px Microsoft JhengHei'
  cans.fillStyle = textColor || 'rgba(180,180,180,.3)'
  cans.textAlign = 'left'
  cans.textBaseline = 'middle'
  cans.fillText(str, can.width / 10, can.height / 2)
  parentNode.style.backgroundImage = `url(${can.toDataURL('image/png')})`
}

export default {
  bind (el, { value }) {
    const { text, font, textColor } = value
    addWaterMarker(text, el, font, textColor)
  }
}
