import Cookies from 'js-cookie'
import type { ThemeConfig } from '@/layout/types'
import { useCssVar } from '@vueuse/core'
import { cloneDeep } from 'lodash'
import { defaultTheme } from '../config'

const ThemeKey = 'Admin-Theme-Config'

/**
 * 从缓存冲获取配置
 */
export function getThemeConfig() {
  return Cookies.get(ThemeKey)
}

/**
 * 保持配置到缓存中
 * @param themeConfig
 */
export function setThemeConfig(themeConfig: string) {
  return Cookies.set(ThemeKey, themeConfig)
}

/**
 * 删除缓存
 */
export function removeThemeConfig() {
  return Cookies.remove(ThemeKey)
}

/**
 * 设置css变量值
 * @param property
 * @param value
 */
export function setCssVar(property: string, value: string) {
  useCssVar(property, document.documentElement).value = value
}

/**
 * 将值转为px
 * @param num
 * @returns string
 */
export function toPx(num: number): string {
  return `${Number(num) || 0}px`
}

/**
 * 加载主题，如果缓存中有则从缓存中获取
 */
export function loadThemeConfig(): ThemeConfig {
  const theme = cloneDeep(defaultTheme)
  const config = getThemeConfig()
  if (config) {
    const data = JSON.parse(config)
    Object.assign(theme, data)
  }
  return theme
}
