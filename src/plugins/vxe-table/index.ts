import { App } from 'vue'
import VXETable from 'vxe-table'
import './variable.scss'

export function setupVxeTable(app: App) {
  app.use(VXETable)
}
