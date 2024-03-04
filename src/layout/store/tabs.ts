import { defineStore } from 'pinia'
import { MenuOption } from '../types'

interface TabsState {
  activeTabs: MenuOption[]
  cacheTabs: MenuOption[]
}

export const useTabsStore = defineStore('tabs', {
  state: (): TabsState => ({
    // 激活选项卡列表
    activeTabs: [],
    // 缓存选项卡列表
    cacheTabs: [],
  }),

  actions: {
    /**
     * 加载固定选项卡
     */
    loadFixedTabs(menus: MenuOption[]) {
      this.activeTabs = menus.filter((item) => item.meta.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 添加选项卡
     * @param tab
     */
    addTab(tab: MenuOption) {
      const index = this.activeTabs.findIndex((item) => item.meta.menuId === tab.meta.menuId)
      if (index > -1) return
      this.activeTabs.push(tab)
      if (tab.meta.cache) this.refreshCacheTabs()
    },

    /**
     * 删除选项卡
     * @param tab
     */
    delTab(tab: MenuOption) {
      this.activeTabs = this.activeTabs.filter((item) => item.meta.menuId !== tab.meta.menuId)
      if (tab.meta.cache) this.refreshCacheTabs()
    },

    /**
     * 删除左侧选项卡
     * @param tab
     */
    delLeftTabs(tab: MenuOption) {
      const index = this.activeTabs.findIndex((item) => item.meta.menuId === tab.meta.menuId)
      this.activeTabs = this.activeTabs.filter((item, i) => i >= index || item.meta.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 删除右侧选项卡
     * @param tab
     */
    delRightTabs(tab: MenuOption) {
      const index = this.activeTabs.findIndex((item) => item.meta.menuId === tab.meta.menuId)
      this.activeTabs = this.activeTabs.filter((item, i) => i <= index || item.meta.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 删除其它选项卡
     */
    delOtherTabs(tab: MenuOption) {
      this.activeTabs = this.activeTabs.filter((item) => item.meta.menuId === tab.meta.menuId || item.meta.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 删除全部选项卡
     */
    delAllTabs() {
      this.activeTabs = this.activeTabs.filter((item) => item.meta.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 刷新缓存选项卡
     */
    refreshCacheTabs() {
      this.cacheTabs = this.activeTabs.filter((item) => item.meta.cache)
    },
  },
})
