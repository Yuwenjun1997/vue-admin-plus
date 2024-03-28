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

/**
 * 随机生成一个函数名
 * @returns 函数名
 */
export function generateRandomFunctionName() {
  // 生成随机的字母序列作为函数名
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  let functionName = ''
  for (let i = 0; i < 5; i++) {
    functionName += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  // 添加一个前缀以确保函数名有效
  functionName = 'func_' + functionName
  return functionName
}
