import { defineStore } from 'pinia'
import { MenuMeta, MenuOption } from '@/layout/types'

interface TabsState {
  activeTabs: MenuMeta[]
  cacheTabs: MenuMeta[]
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
      this.activeTabs = menus.map((menu) => menu.meta).filter((meta) => meta.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 添加选项卡
     * @param tab
     */
    addTab(tab: MenuMeta) {
      const index = this.activeTabs.findIndex((item) => item.menuId === tab.menuId)
      if (index > -1) return
      this.activeTabs.push(tab)
      if (tab.cache) this.refreshCacheTabs()
    },

    /**
     * 删除选项卡
     * @param tab
     */
    delTab(tab: MenuMeta) {
      this.activeTabs = this.activeTabs.filter((item) => item.menuId !== tab.menuId)
      if (tab.cache) this.refreshCacheTabs()
    },

    /**
     * 删除左侧选项卡
     * @param tab
     */
    delLeftTabs(tab: MenuMeta) {
      const index = this.activeTabs.findIndex((item) => item.menuId === tab.menuId)
      this.activeTabs = this.activeTabs.filter((item, i) => i >= index || item.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 删除右侧选项卡
     * @param tab
     */
    delRightTabs(tab: MenuMeta) {
      const index = this.activeTabs.findIndex((item) => item.menuId === tab.menuId)
      this.activeTabs = this.activeTabs.filter((item, i) => i <= index || item.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 删除其它选项卡
     */
    delOtherTabs(tab: MenuMeta) {
      this.activeTabs = this.activeTabs.filter((item) => item.menuId === tab.menuId || item.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 删除全部选项卡
     */
    delAllTabs() {
      this.activeTabs = this.activeTabs.filter((item) => item.tabFixed)
      this.refreshCacheTabs()
    },

    /**
     * 刷新缓存选项卡
     */
    refreshCacheTabs() {
      this.cacheTabs = this.activeTabs.filter((item) => item.cache)
    },
  },
})
