import { App } from 'vue'
import 'vant/lib/index.css'
import Vant from 'vant'

export function setupVant(app: App) {
  app.use(Vant)
}
