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
