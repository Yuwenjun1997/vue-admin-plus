export function useExtractValueAndUnit(cssValue: string) {
  // 使用正则表达式匹配数字和单位
  const pattern = /(\d+(?:\.\d+)?)(%|\w+)/
  const match = cssValue.match(pattern)

  // 如果匹配成功，则返回值和单位的数组，否则返回 null
  if (match) {
    return [parseFloat(match[1]), match[2]]
  } else {
    return null
  }
}
