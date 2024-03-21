import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'element-plus/es/components/message/style/css'
// import 'element-plus/es/components/message-box/style/css'
import { App } from 'vue'

export function setupElementPlus(app: App) {
  app.use(ElementPlus)
}
