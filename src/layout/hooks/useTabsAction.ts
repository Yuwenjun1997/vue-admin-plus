import { TabPaneName } from 'element-plus'
import { useMenuStore } from '../store/menu'
import { useTabsStore } from '../store/tabs'

export function useTabsAction() {
  const router = useRouter()
  const menuStore = useMenuStore()
  const tabsStore = useTabsStore()

  // tabs change
  const handleTabChange = (targetTab: TabPaneName) => {
    const menu = menuStore.flatMenus.find((item) => item.meta.menuId === targetTab)
    if (menu) {
      router.push(menu.path)
    } else {
      router.push('/')
    }
  }

  // tabs remove
  const handleTabRemove = (targetTab: TabPaneName) => {
    const tabs = tabsStore.activeTabs
    let activeTab = menuStore.activeMenuKey
    if (activeTab === targetTab) {
      tabs.forEach((tab, index) => {
        if (tab.menuId === targetTab) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeTab = nextTab.menuId
          }
        }
      })
    }
    handleDelTab(targetTab)
    handleTabChange(activeTab)
  }

  // del tab
  const handleDelTab = (name: TabPaneName) => {
    const meta = tabsStore.activeTabs.find((item) => item.menuId === name)
    meta && tabsStore.delTab(meta)
  }

  return { handleTabChange, handleTabRemove }
}
