/**
 * 生成新的颜色的函数示例
 * @param originalColor
 */
export function generateNewColor(originalColor: string) {
  let r = parseInt(originalColor.substring(1, 2), 16) + 10
  let g = parseInt(originalColor.substring(3, 2), 16) + 10
  let b = parseInt(originalColor.substring(5, 2), 16) + 10

  r = Math.min(r, 255)
  g = Math.min(g, 255)
  b = Math.min(b, 255)

  return '#' + r.toString(16) + g.toString(16) + b.toString(16)
}

/**
 * 加深颜色的函数示例
 * @param color
 * @param percent
 */
export function darkenColor(color: string, percent: number) {
  const num = parseInt(color.slice(1), 16)
  const amt = Math.round(2.55 * percent)
  let r = (num >> 16) - amt
  let b = ((num >> 8) & 0x00ff) - amt
  let g = (num & 0x0000ff) - amt

  if (r < 0) r = 0
  if (b < 0) b = 0
  if (g < 0) g = 0

  return '#' + (g | (b << 8) | (r << 16)).toString(16)
}

/**
 * 变亮颜色的函数示例
 * @param color
 * @param percent
 */
export function lightenColor(color: string, percent: number) {
  const num = parseInt(color.slice(1), 16)
  const amt = Math.round(2.55 * percent)
  let r = (num >> 16) + amt
  let b = ((num >> 8) & 0x00ff) + amt
  let g = (num & 0x0000ff) + amt

  if (r > 255) r = 255
  if (b > 255) b = 255
  if (g > 255) g = 255

  return '#' + (g | (b << 8) | (r << 16)).toString(16)
}

/**
 * 颜色混合
 * @param color1
 * @param color2
 * @param weight
 */
export function mixColor(color1: string, color2: string, weight: number) {
  // 将颜色转换为 RGBA 格式
  function rgba(color: string) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return [r, g, b]
  }

  const rgba1 = rgba(color1)
  const rgba2 = rgba(color2)

  // 计算混合后的颜色值
  const w = weight * 2 - 1
  const a = rgba1[3] - rgba2[3]

  const weight1 = ((w * a == -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
  const weight2 = 1 - weight1

  const rgbaResult = [
    Math.round(rgba1[0] * weight1 + rgba2[0] * weight2),
    Math.round(rgba1[1] * weight1 + rgba2[1] * weight2),
    Math.round(rgba1[2] * weight1 + rgba2[2] * weight2),
  ]

  // 转换为十六进制表示
  const resultColor =
    '#' +
    ('0' + rgbaResult[0].toString(16)).slice(-2) +
    ('0' + rgbaResult[1].toString(16)).slice(-2) +
    ('0' + rgbaResult[2].toString(16)).slice(-2)
  return resultColor
}
