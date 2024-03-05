import { DropdownInstance } from 'element-plus'
import { CommandEnums, MenuMeta } from '@/layout/types'
import { useTabsStore } from '../store/tabs'
import { useMenuStore } from '../store/menu'
import { useRedo } from './usePage'
import { useTabsAction } from './useTabsAction'

export function useTabsCommand() {
  const tabsStore = useTabsStore()
  const menuStore = useMenuStore()
  const { handleTabChange } = useTabsAction()

  const handleMenu = ref<MenuMeta>()

  const openMenu = (item: MenuMeta, evnt: MouseEvent, contextmenu?: DropdownInstance) => {
    if (!contextmenu) return
    contextmenu.handleOpen()
    const { clientX, clientY } = evnt
    contextmenu.$el.style.left = clientX + 'px'
    contextmenu.$el.style.top = clientY + 'px'
    handleMenu.value = item
  }

  const handleMenuIndex = computed(() => {
    return tabsStore.activeTabs.findIndex((item) => item.menuId === handleMenu.value?.menuId)
  })
  const allTabsFixed = computed(() => {
    return tabsStore.activeTabs.every((item) => item.tabFixed)
  })
  const isFirstTab = computed(() => handleMenuIndex.value === 0)
  const isLastTab = computed(() => handleMenuIndex.value === tabsStore.activeTabs.length - 1)
  const isActiveTab = computed(() => !!handleMenu.value && handleMenu.value.menuId !== menuStore.activeMenuKey)

  const disabledCommand = (command: CommandEnums): boolean => {
    if (command === CommandEnums.refresh) return isActiveTab.value
    if (allTabsFixed.value) return true
    if (command === CommandEnums.closeLeft) return isFirstTab.value
    if (command === CommandEnums.closeRight) return isLastTab.value
    if (command === CommandEnums.closeOther) return tabsStore.activeTabs.length === 1
    return false
  }

  // 刷新页面
  const router = useRouter()
  const handleRefresh = useRedo(router)

  const handleCommand = (command: CommandEnums) => {
    if (!handleMenu.value) return
    if (command === CommandEnums.closeOther) {
      tabsStore.delOtherTabs(handleMenu.value)
      handleTabChange(handleMenu.value.menuId)
    }
    if (command === CommandEnums.closeLeft) {
      tabsStore.delLeftTabs(handleMenu.value)
      handleTabChange(handleMenu.value.menuId)
    }
    if (command === CommandEnums.closeRight) {
      tabsStore.delRightTabs(handleMenu.value)
      handleTabChange(handleMenu.value.menuId)
    }
    if (command === CommandEnums.closeAll) {
      tabsStore.delAllTabs()
      router.push('/')
    }
    if (command === CommandEnums.refresh) {
      handleRefresh()
    }
  }

  return {
    disabledCommand,
    onCommand: handleCommand,
    openMenu,
  }
}
