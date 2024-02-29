import { defineStore } from 'pinia'
import { ThemeColorProperty, ThemeConfig } from '@/types/theme'
import { TinyColor } from '@ctrl/tinycolor'
import { useCssVar, useDark } from '@vueuse/core'
import { getThemeConfig, removeThemeConfig } from '@/utils/theme'
import { toPx } from '@/utils'
import { cloneDeep } from 'lodash'
import defaultTheme from '@/config/theme'

/**
 * 设置css变量值
 * @param property
 * @param value
 */
export function setCssVar(property: ThemeColorProperty, value: string) {
  useCssVar(property, document.documentElement).value = value
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

export const useTheme = defineStore('theme', {
  state: (): ThemeConfig => loadThemeConfig(),

  actions: {
    /**
     * 切换显示菜单栏
     * @param value
     */
    toggleMenuCollapse(value?: boolean) {
      if (typeof value === 'boolean') {
        this.menuCollapse = value
      } else {
        this.menuCollapse = !this.menuCollapse
      }
    },

    /**
     * 更新主题色
     * @param color
     */
    updateThemeColor(color?: string) {
      const primaryColor = new TinyColor(color || this.themeColor || '#000')
      const colors = [...this.themeColorMap.light, ...this.themeColorMap.dark]
      colors.forEach((item) => {
        const color = item.mixType === 'light' ? '#ffffff' : '#000000'
        item.value = primaryColor.mix(color, item.percent).toHexString()
      })
    },

    /**
     * 应用主题色
     */
    applyThemeColor(isDark: boolean) {
      const colors = isDark ? this.themeColorMap.dark : this.themeColorMap.light
      colors.forEach((item) => {
        useCssVar(item.key, document.documentElement).value = item.value
      })
    },

    /**
     * 应用主题尺寸
     */
    applyThemeSize() {
      setCssVar('--xy-layout-navbar-tags-height', this.showNavbarTags ? toPx(40) : toPx(0))
      setCssVar('--xy-layout-aside-left-width', this.showSubfield ? toPx(this.subfieldWidth) : toPx(0))
    },

    /**
     * 加载主题
     */
    loadTheme() {
      this.updateThemeColor()
      this.applyThemeColor(useDark().value)
      this.applyThemeSize()
    },

    /**
     * 重置主题
     */
    resetTheme() {
      removeThemeConfig()
      const theme = loadThemeConfig()
      Object.assign(this.$state, theme)
      this.updateThemeColor()
      this.applyThemeColor(useDark().value)
      this.applyThemeSize()
    },
  },
})
