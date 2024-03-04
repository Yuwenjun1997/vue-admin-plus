import { defineStore } from 'pinia'
import { TinyColor } from '@ctrl/tinycolor'
import { useCssVar, useDark } from '@vueuse/core'
import type { ThemeConfig } from '@/layout/types'
import { loadThemeConfig, removeThemeConfig, setCssVar, toPx } from '../utils'
import { ThemeCssProperty } from '../config'

export const useThemeStore = defineStore('theme', {
  state: (): ThemeConfig => loadThemeConfig(),

  actions: {
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
      setCssVar(ThemeCssProperty.LOGO_WIDTH, toPx(this.logoWidth))
      setCssVar(ThemeCssProperty.MENU_WIDTH, toPx(this.menuWidth))
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
