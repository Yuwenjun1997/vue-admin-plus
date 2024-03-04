import { App } from 'vue'
import './styles/index.scss'
import { useThemeStore } from './store/theme'

export function setupLayout(app: App<Element>) {
  const theme = useThemeStore()
  theme.loadTheme()
  console.log(app)
}
