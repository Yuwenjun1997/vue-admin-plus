import { defineStore } from 'pinia'
import { ThemeConfig } from '@/types/theme'
import { themeColorMap } from '@/config/theme'
import { TinyColor } from '@ctrl/tinycolor'
import { useCssVar } from '@vueuse/core'

export const useTheme = defineStore('theme', {
  state: (): ThemeConfig => ({
    showThemeSetting: false,
    themeColor: '#409eff',
    menuCollapse: false,
    menuWidth: 240,
    showMenu: true,
    subfieldWidth: 60,
    showSubfield: true,
    showNavbarTags: true,
    showNavbarTagsIcon: true,
    hideToolbar: true,
    showBreadcrumb: true,
    showWatermark: false,
    watermarkContent: 'vue admin plus',
    themeColorMap: themeColorMap,
  }),

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
      const primaryColor = new TinyColor(color || this.themeColor)
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
      console.log(isDark)
      colors.forEach((item) => {
        useCssVar(item.key, document.documentElement).value = item.value
      })
    },
  },
})
