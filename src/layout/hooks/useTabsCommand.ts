import { DropdownInstance } from 'element-plus'
import { CommandEnums, MenuOption } from '@/layout/types'
import { useTabsStore } from '../store/tabs'
import { useMenuStore } from '../store/menu'

const tabsStore = useTabsStore()
const menuStore = useMenuStore()

const handleMenu = ref<MenuOption>()

export function useTabsCommand() {
  const openMenu = (item: MenuOption, evnt: MouseEvent, contextmenu?: DropdownInstance) => {
    if (!contextmenu) return
    contextmenu.handleOpen()
    const { clientX, clientY } = evnt
    contextmenu.$el.style.left = clientX + 'px'
    contextmenu.$el.style.top = clientY + 'px'
    handleMenu.value = item
  }

  const handleMenuIndex = computed(() => {
    return tabsStore.activeTabs.findIndex((item) => item.meta.menuId === handleMenu.value?.meta.menuId)
  })
  const allTabsFixed = computed(() => {
    return tabsStore.activeTabs.every((item) => item.meta.tabFixed)
  })
  const isFirstTab = computed(() => handleMenuIndex.value === 0)
  const isLastTab = computed(() => handleMenuIndex.value === tabsStore.activeTabs.length - 1)
  const isActiveTab = computed(() => !!handleMenu.value && handleMenu.value.meta.menuId !== menuStore.activeMenuKey)

  const disabledCommand = (command: CommandEnums): boolean => {
    if (command === CommandEnums.refresh) return isActiveTab.value
    if (allTabsFixed.value) return true
    if (command === CommandEnums.closeLeft) return isFirstTab.value
    if (command === CommandEnums.closeRight) return isLastTab.value
    if (command === CommandEnums.closeOther) return tabsStore.activeTabs.length === 1
    return false
  }

  const handleCommand = (command: CommandEnums) => {
    if (!handleMenu.value) return
    if (command === CommandEnums.closeOther) tabsStore.delOtherTabs(handleMenu.value)
    if (command === CommandEnums.closeLeft) tabsStore.delLeftTabs(handleMenu.value)
    if (command === CommandEnums.closeRight) tabsStore.delRightTabs(handleMenu.value)
    if (command === CommandEnums.closeAll) tabsStore.delAllTabs()
    if (command === CommandEnums.refresh) {
      // router.replace({ path: '/redirect' + route.fullPath, query: route.query })
    }
  }

  return {
    disabledCommand,
    onCommand: handleCommand,
    openMenu,
  }
}
