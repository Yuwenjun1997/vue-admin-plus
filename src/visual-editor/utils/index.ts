/**
 * 提取css的值和单位
 * @param cssValue
 * @param unit
 * @returns
 */
export function extractValueAndUnit(cssValue: string, unit = 'px') {
  // 使用正则表达式匹配数字和单位
  const pattern = /(\d+(?:\.\d+)?)(%|\w+)/
  const match = cssValue.match(pattern)

  // 如果匹配成功，则返回值和单位的数组，否则返回 null
  if (match) {
    return [parseFloat(match[1]), match[2]]
  } else {
    return [undefined, unit]
  }
}
