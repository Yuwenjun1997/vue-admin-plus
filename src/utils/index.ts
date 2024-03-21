/**
 * 将值转为px
 * @param num
 * @returns string
 */
export function toPx(num: number): string {
  return `${Number(num) || 0}px`
}

/**
 * 睡眠
 * @param ms
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 将字符串转为kebab-case 形式
 * @param str
 * @returns
 */
export function toKebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 判断一个值是否是数字字符串
 * @param str
 * @returns {boolean}
 */
export function isNumberStr(str: string): boolean {
  return /^[0-9]+$/.test(str)
}
