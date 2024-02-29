import { defineStore } from 'pinia'
import { ThemeConfig } from '@/types/theme'

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
  }),

  actions: {
    toggleMenuCollapse(value?: boolean) {
      if (typeof value === 'boolean') {
        this.menuCollapse = value
      } else {
        this.menuCollapse = !this.menuCollapse
      }
    },
  },
})
