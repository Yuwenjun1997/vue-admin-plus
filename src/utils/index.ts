/**
 * 将值转为px
 * @param num
 * @returns string
 */
export function toPx(num: number): string {
  return `${Number(num) || 0}px`
}
