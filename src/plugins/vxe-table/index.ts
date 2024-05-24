import { App } from 'vue'
import { VxeIcon, VxeTable, VxeColumn, VxeColgroup } from 'vxe-table'
import './variable.scss'

export function setupVxeTable(app: App) {
  app.use(VxeIcon)
  app.use(VxeTable)
  app.use(VxeColumn)
  app.use(VxeColgroup)
}
