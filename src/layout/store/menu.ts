import { defineStore } from 'pinia'
import { MenuOption } from '@/layout/types'

interface MenuStore {
  activeRootMenuKey: string
  activeMenuKey: string
  rootMenus: MenuOption[]
  flatMenus: MenuOption[]
}

export const useMenuStore = defineStore('menu', {
  state: (): MenuStore => ({
    activeRootMenuKey: '',
    activeMenuKey: '',
    rootMenus: [],
    flatMenus: [],
  }),

  actions: {
    /**
     * 加载菜单列表
     */
    loadMenus(menus: MenuOption[]) {
      this.flatMenusHandler(menus)
      this.rootMenus = menus
    },

    /**
     * flat menus
     */
    flatMenusHandler(menus?: MenuOption[]) {
      if (!menus) return
      menus.forEach((menu) => {
        this.flatMenus.push(menu)
        this.flatMenusHandler(menu.children)
      })
    },

    /**
     * 根据菜单id获取菜单path
     * @param menuId
     */
    getMenuPathByMenuId(menuId: string) {
      return this.flatMenus.find((menu) => menu.meta.menuId === menuId)?.path
    },
  },
})
