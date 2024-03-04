import './styles/index.scss'
import { useThemeStore } from './store/theme'
import { useMenuStore } from './store/menu'
import { useTabsStore } from './store/tabs'
import { menus } from './data'
import { sleep } from '@/utils'

export async function setupLayout() {
  await sleep(500)

  // 加载主题
  const theme = useThemeStore()
  theme.loadTheme()

  // 加载菜单
  const menuStore = useMenuStore()
  menuStore.loadMenus(menus)

  // 加载选项卡
  const tabsStore = useTabsStore()
  tabsStore.loadFixedTabs(menuStore.flatMenus)

  return true
}
