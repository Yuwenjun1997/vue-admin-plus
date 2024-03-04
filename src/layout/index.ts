import { App } from 'vue'
import './styles/index.scss'
import { useThemeStore } from './store/theme'
import { useMenuStore } from './store/menu'
import { menus } from './data'
import { useTabsStore } from './store/tabs'

export function setupLayout(app: App<Element>) {
  // 加载主题
  const theme = useThemeStore()
  theme.loadTheme()

  // 加载菜单
  const menuStore = useMenuStore()
  menuStore.loadMenus(menus)

  // 加载选项卡
  const tabsStore = useTabsStore()
  tabsStore.loadFixedTabs(menuStore.flatMenus)
  console.log(app)
}
